import React from 'react';
import { Grid } from '@mui/material';

const Doctor = ({ doctor }) => {
    const { name, image } = doctor;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <img
                style={{ width: '200px', height: '250px' }}
                src={`data:image/jpeg;base64,${image}`} alt="" />

            <h2>{name}</h2>
        </Grid>
    );
};

export default Doctor;