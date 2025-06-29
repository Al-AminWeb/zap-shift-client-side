import React from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import Swal from "sweetalert2";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isPending) {
        return <p className="text-center text-gray-500">Loading parcel info...</p>;
    }

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Step 1: Create Payment Method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error('Payment method error:', error);
            Swal.fire('Error', error.message, 'error');
            return;
        }

        // Step 2: Create Payment Intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId,
        });

        const clientSecret = res.data.clientSecret;

        // Step 3: Confirm Card Payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (result.error) {
            console.error('Payment confirmation error:', result.error.message);
            Swal.fire('Payment Failed', result.error.message, 'error');
        } else if (result.paymentIntent.status === 'succeeded') {
            const transactionId = result.paymentIntent.id;

            // Step 4: Save payment to DB
            const paymentDoc = {
                parcelId,
                amount,
                createdBy: parcelInfo.createdBy,
                paymentMethod: result.paymentIntent.payment_method_types,
                transactionId,
            };

            const paymentRes = await axiosSecure.post('/payments', paymentDoc);

            if (paymentRes.data.paymentId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    html: `Transaction ID: <b>${transactionId}</b>`,
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/dashboard/myParcels');
                });
            } else {
                Swal.fire('Warning', 'Payment succeeded but failed to record in database.', 'warning');
            }
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
            >
                <CardElement className="p-2 border-rounded" />
                <button className="btn btn-primary w-full" type="submit" disabled={!stripe}>
                    Pay ৳{amount}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
