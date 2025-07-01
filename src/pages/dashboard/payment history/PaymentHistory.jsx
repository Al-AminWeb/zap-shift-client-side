import React from 'react';
import useAuth from "../../../hooks/useAuth.jsx";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx"; // ✅ Correct import

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    console.log("🔐 Authenticated user:", user);

    const {
        isPending,
        isError,
        error,
        data: payments = []
    } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            console.log("📦 Fetching payments for:", user?.email);
            const res = await axiosSecure.get(`/payments?createdBy=${user?.email}`);
            console.log("✅ Server responded with payments:", res.data);
            return res.data;
        },
        enabled: !!user?.email  // ✅ Prevents running if user not loaded yet
    });

    if (isPending) {
        console.log("⏳ Loading payment history...");
        return <p className="text-center text-gray-500">Loading payment history...</p>;
    }

    if (isError) {
        console.error("❌ Error fetching payments:", error);
        return <p className="text-center text-red-500">Failed to load payment history.</p>;
    }

    if (payments.length === 0) {
        console.warn("⚠️ No payments found for user.");
        return <p className="text-center text-yellow-500">No payment history found.</p>;
    }

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base-content">
                <tr>
                    <th>#</th>
                    <th>Parcel ID</th>
                    <th>Amount (৳)</th>
                    <th>Method</th>
                    <th>Transaction ID</th>
                    <th>Date & Time</th>
                    <th>Paid By</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment, idx) => {
                    console.log(`🧾 Rendering payment #${idx + 1}:`, payment);
                    return (
                        <tr key={payment._id || idx}>
                            <td>{idx + 1}</td>
                            <td className="text-sm text-gray-600">
                                {payment.parcelId?.toString().slice(-6) || "N/A"}
                            </td>
                            <td className="font-bold text-green-600">৳{payment.amount}</td>
                            <td className="capitalize">{payment.paymentMethod?.[0] || "N/A"}</td>
                            <td className="text-xs">{payment.txId || "N/A"}</td>
                            <td>{format(new Date(payment.createdAtISO), "PPPp")}</td>
                            <td>{payment.createdBy || "Unknown"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
