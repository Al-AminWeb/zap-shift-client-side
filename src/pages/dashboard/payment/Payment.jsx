import React from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm/>
            </Elements>
        </div>
    );
};

export default Payment;
