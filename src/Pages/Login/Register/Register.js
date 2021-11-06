import { Container, Grid, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../img/login.png'

const Register = () => {
    const { user, registerUser, isLoading, authError } = useAuth();
    const [loginData, setLoginData] = useState({});
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);

        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        // console.log(newLoginData);
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert("Your password didn't match");
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, loginData.image, history);
        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            type='text'
                            onBlur={handleOnBlur}
                            variant="standard" />
                        
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic" label="Your Email"
                            name="email"
                            type='email'
                            onBlur={handleOnBlur}
                            variant="standard" />
                        
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic" label="Your Password"
                            type='password'
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic" label="Re-Type Your Password"
                            type='password'
                            name="password2"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic" label="Photo URL"
                            name="image"
                            onBlur={handleOnBlur}
                            variant="standard" />
                        
                        <Button
                            sx={{ width: '75%', m: 1 }} variant='contained'
                            type='submit'
                        >Register</Button>

                        <NavLink style={{ textDecoration: 'none' }} to='/login'>
                            <Button variant='text'>
                                Already Registered? Please Login
                            </Button>
                        </NavLink>
                    </form>}

                    {isLoading && <CircularProgress color="success" />}
                    {
                        user?.email && <Alert severity="success">User Created Successfully!!</Alert>
                    }
                    {
                        authError && <Alert severity="error">{authError}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;