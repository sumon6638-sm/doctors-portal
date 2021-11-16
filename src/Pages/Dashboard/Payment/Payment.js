import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Jvnk0HBUhVEWPX0w7vmklUEoSwDlnkKaaYvGjVIGUF7JQPt7SVpO8LtO1pg0B6KzupvLFLUdShdVjbJDbFFqZNF00bBCpuOZw')

const Payment = () => {
    const { appointmentId } = useParams();

    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`https://lit-lowlands-55954.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    },[appointmentId])

    return (
        <div>
            <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay: ${appointment.price}</h4>

            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckOutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;