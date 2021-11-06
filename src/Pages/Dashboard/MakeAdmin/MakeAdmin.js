import React, {useState} from 'react';
import { TextField, Button, Alert } from '@mui/material';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlue = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setEmail('');
                    setSuccess(true);
                }
        })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{ width: '50%'}}
                    label="Email"
                    type="email"
                    onBlur={handleOnBlue}
                    variant="standard" />
                <Button type='submit' variant='contained'>Make Admin</Button>
            </form>
            {success && <Alert severity='success'>Maid Admin Successfully!!</Alert> }
        </div>
    );
};

export default MakeAdmin;