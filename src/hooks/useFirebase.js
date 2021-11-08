import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, updateProfile, getIdToken, signOut } from "firebase/auth";

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();

    const registerUser = ( email, password, name, image, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');

                // user jokhon register korbe 2khn name ta k set kore dite hbe... login er khetre set korte hbe na..
                const newUser = { email, displayName: name, photoURL: image };
                setUser(newUser);

                // save user to the database
                saveUser(email, name, 'POST');

                // after creation send name to firebase i should update profile other wise i can't see the name without reload my website.. it's have another method --> window.location.reload() but standard method is updateProfile
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: image
                }).then(() => {

                }).catch((error) => {
                    
                });

                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    // login with google
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // save user to the database
                saveUser(user.email, user.displayName, 'PUT')
                setAuthError('');

                const destination = location?.state?.from || '/';
                history.replace(destination);
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user).then(idToken => {
                    // console.log(idToken);
                    setToken(idToken);
                })
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unSubscribe;
    }, [auth])

    // checking a user is he admin or not
    useEffect(() => {
        fetch(`https://lit-lowlands-55954.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    },[user.email])

    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
        .finally(()=>setIsLoading(false));
    }

    // save user to my database...
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://lit-lowlands-55954.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
        token,
        isLoading,
        authError,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;