import React from 'react';
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQueryClient } from '@tanstack/react-query';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels?email=${user.email}`);
            return res.data;
        }
    });

    const getCost = (parcel) => {
        const isSameDistrict = parcel.senderCenter === parcel.receiverCenter;
        const { type, weight } = parcel;

        if (type === 'document') return isSameDistrict ? 60 : 80;

        const w = parseFloat(weight) || 0;

        if (w <= 3) {
            return isSameDistrict ? 110 : 150;
        }

        const base = isSameDistrict ? 110 : 150;
        const extraWeight = (w - 3) * 40;
        const outOfDistrictFee = isSameDistrict ? 0 : 40;

        return base + extraWeight + outOfDistrictFee;
    };

    const onView = (parcel) => {
        console.log('View:', parcel);
        // Optional: Open modal or navigate to details page
    };

    const onPay = (parcel) => {
        console.log('Pay:', parcel);
        // Optional: Trigger payment process
    };
    const queryClient = useQueryClient();
    const onDelete = (id) => {
        Swal.fire({
            title: 'Delete this parcel?',
            text: "You won't be able to undo this action.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/parcels/${id}`);
                    toast.success('Parcel deleted');              // optional toast
                    queryClient.invalidateQueries(['my-parcels', user.email]); // refetch list
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error', 'Failed to delete parcel.', 'error');
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base-content">
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Title</th> {/* ✅ New Column */}
                    <th>Created At</th>
                    <th>Cost (৳)</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map((parcel, idx) => {
                    const cost = getCost(parcel);
                    const createdAt = format(new Date(parcel.createdAtISO), 'PPPp');
                    const isPaid = parcel.isPaid === true;

                    return (
                        <tr key={parcel._id}>
                            <td>{idx + 1}</td>
                            <td className="capitalize">{parcel.type.replace('-', ' ')}</td>
                            <td>{parcel.title}</td> {/* ✅ Show Title */}
                            <td>{createdAt}</td>
                            <td className="text-right font-semibold">৳{cost}</td>
                            <td>
                  <span className={`badge ${isPaid ? 'badge-success' : 'badge-error'}`}>
                    {isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                            </td>
                            <td className="flex gap-2">
                                <button onClick={() => onView(parcel)} className="btn btn-sm btn-info">View</button>
                                {!isPaid && (
                                    <button onClick={() => onPay(parcel)} className="btn btn-sm btn-success">Pay</button>
                                )}
                                <button onClick={() => onDelete(parcel._id)} className="btn btn-sm btn-error">Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;
