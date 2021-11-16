import React, { useState } from 'react';
import { Input, TextField, Button, Alert } from '@mui/material';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    // another format to take text from input field other in the name
    /* const handleEmail = e => {
        setEmail(e.target.value);
    } */

    const handleSubmit = e => {
        e.preventDefault()
        if (!image) {
            alert('Please Add an Image');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://lit-lowlands-55954.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess("Doctor Added Successfully!!");
                    alert('Doctor Added Successfully!!');
                }
            })
            .catch(error => {
                console.error('Error: ', error);
        })
    }

    return (
        <div>
            <h3>Add A Doctor</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{width: '50%'}}
                    id="standard-basic"
                    label="Name"
                    required
                    onChange={e=>setName(e.target.value)}
                    variant="standard" />
                <br />
                
                <TextField
                    sx={{ width: '50%' }}
                    id="standard-basic"
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="standard" />
                <br />

                <Input
                    accept="image/*"    // --> All type of image will be accepted, we can declare type also, like 'image/png, image/jpg etc...'

                    // multiple --> When give access to upload multiple image...

                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <Button variant="contained" type='submit'>
                    Add Doctor
                </Button>
            </form>
            {
                success && <Alert color='success'>{success}</Alert>
            }
        </div>
    );
};

export default AddDoctor;