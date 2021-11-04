import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../img/doctor.png'
import bg from '../../../img/appointment-bg.png'
import { Button, Typography } from '@mui/material';

const appointmentBanner = {
    background: `url(${bg})`,
    backgroundColor: 'rgba(45,58,74, 0.7)',
    backgroundBlendMode: 'darken, luminosity',
    marginTop: 150
}

const AppointmentBanner = () => {
    return (
        <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img style={{width: 400, marginTop: '-110px'}} src={doctor} alt="" />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'center' }}>
                    <Box>
                        <Typography variant='h6' sx={{mb: 5}} style={{ color: '#2EC0C5' }}>
                            Appointment
                        </Typography>
                        <Typography variant='h4' style={{ color: 'white' }}>
                            Make an appointment Today
                        </Typography>
                        <Typography variant='h6' sx={{my: 5}} style={{ color: 'white', fontSize: 14, fontWeight: 300 }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam asperiores veniam reiciendis, recusandae quam assumenda molestiae! Quis repellendus perferendis facilis.
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: '#2EC0C5' }}>Learn more</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppointmentBanner;