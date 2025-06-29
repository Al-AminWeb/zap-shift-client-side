import React from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!stripe||!elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}  className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto' >
                <CardElement className='p-2 border-rounded'></CardElement>
                <button className='btn btn-primary w-full' type='submit' disabled={!stripe}>Pay for parcel pickup</button>
            </form>
        </div>
    );
};

export default PaymentForm;
