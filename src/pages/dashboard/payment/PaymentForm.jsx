import React from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const{parcelId}=useParams();
    const axiosSecure = useAxiosSecure();

    const {isPending, data:parcelInfo={}}=useQuery({
        queryKey:['parcels',parcelId],
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })
    if (isPending) {
        return <p className="text-center text-gray-500">Loading parcel info...</p>;
    }

    console.log(parcelInfo);

 const amount = parcelInfo.cost
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
                <button className='btn btn-primary w-full' type='submit' disabled={!stripe}>Pay ${amount}</button>
            </form>
        </div>
    );
};

export default PaymentForm;
