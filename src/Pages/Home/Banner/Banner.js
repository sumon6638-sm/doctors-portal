import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import chair from '../../../img/chair.png';
import bg from '../../../img/bg.png';
import { Button, Typography, Container } from '@mui/material';

const bannerBg = {
    background: `url(${bg})`
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}

const Banner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item style={{ ...verticalCenter, textAlign: 'left'}} xs={12} md={6}>
                    <Box>
                        <Typography variant='h3'>
                            Your New Smile <br />
                            Starts Here
                        </Typography>

                        <Typography variant='h6' sx={{ fontSize: 13, fontWeight: 300, color: 'gray', my: 5}}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis ullam repudiandae voluptates facilis a sapiente dolor, quo rem eius perferendis?
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: '#2EC0C5' }}>GET APPOINTMENT</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter} >
                    <img style={{width: '350px'}} src={chair} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;