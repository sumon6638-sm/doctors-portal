import { Alert, CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CheckOutForm = ({appointment}) => {
    const { price, patientName, _id } = appointment;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [process, setProcess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://lit-lowlands-55954.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setProcess(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setError(error.message);
            setSuccess('');
        }

        else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
            setProcess(false);
        }

        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
            setSuccess('');
        }
        else {
            setError('');
            setSuccess('Your payment processed successfully!!!');
            console.log(paymentIntent);
            setProcess(false);

            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_secret')[0]
            }
            const url = `https://lit-lowlands-55954.herokuapp.com/appointments/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    process ? <CircularProgress /> : <button type="submit" disabled={!stripe || success}>
                    Pay ${price}
                    </button>
                }
            </form>
            {
                error && <Alert severity="error" sx={{width: '50%', mx: 'auto', mt: 3}}>{error}</Alert>
            }

            {
                success && <Alert sx={{ width: '50%', mx: 'auto', mt: 3 }}>{success}</Alert>
            }
        </div>
    );
};

export default CheckOutForm;

/* 
1. Install stripe and stripe-react ( npm install --save @stripe/react-stripe-js @stripe/stripe-js )
2. set publishable key
3. Make elements
4. Checkout Form

--------------------------------

5. create payment method
6. server create payment Intent api
7. Load client secret
8. ConfirmCard Payment
9. handle user error
*/