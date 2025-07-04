// src/pages/admin/AssignRider.jsx
import { useState } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../shared/Loading/Loading.jsx";


const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    /* ── list of unassigned parcels ── */
    const { data: parcels = [], isLoading: loadingParcels } = useQuery({
        queryKey: ['unassigned-parcels'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/parcels/unassigned');
            return data;
        }
    });

    /* modal state */
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRider, setSelectedRider] = useState(null);

    /* ── fetch riders for selected district ── */
    const {
        data: riders = [],
        isFetching: loadingRiders
    } = useQuery({
        queryKey: ['riders-by-district', selectedParcel?.senderRegion],
        enabled: !!selectedParcel, // only fetch when modal open
        queryFn: async () => {
            const { data } = await axiosSecure.get('/riders/active', {
                params: { district: selectedParcel.senderRegion } // senderRegion === rider.district
            });
            return data;
        }
    });

    /* ── assign mutation ── */
    const assignMut = useMutation({
        mutationFn: async () => {
            await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign`, {
                riderId: selectedRider._id
            });
        },
        onSuccess: () => {
            toast.success('Rider assigned successfully');
            setSelectedParcel(null);
            setSelectedRider(null);
            queryClient.invalidateQueries(['unassigned-parcels']);
        },
        onError: () => toast.error('Failed to assign rider')
    });

    if (loadingParcels) return <Loading />;

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
                📦 Parcels Ready for Rider Assignment
            </h2>

            <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Tracking ID</th>
                    <th>Title</th>
                    <th>Cost</th>
                    <th>Sender Region</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {parcels.map((p, i) => (
                    <tr key={p._id}>
                        <td>{i + 1}</td>
                        <td>{p.trackingId || p._id.slice(-6)}</td>
                        <td>{p.title}</td>
                        <td className="text-right">৳{p.cost}</td>
                        <td>{p.senderRegion}</td>
                        <td>{format(new Date(p.createdAtISO), 'yyyy-MM-dd')}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => setSelectedParcel(p)}
                            >
                                Assign Rider
                            </button>
                        </td>
                    </tr>
                ))}

                {parcels.length === 0 && (
                    <tr>
                        <td colSpan="7" className="text-center py-6 text-gray-500">
                            No parcels waiting for assignment.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* ── Modal ── */}
            {selectedParcel && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">
                            Select Rider for&nbsp;
                            <span className="text-primary">{selectedParcel.senderRegion}</span>
                        </h3>

                        {loadingRiders ? (
                            <p>Loading riders…</p>
                        ) : riders.length === 0 ? (
                            <p className="text-error">No riders in this district.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {riders.map((r) => (
                                        <tr key={r._id}>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="rider"
                                                    className="radio radio-primary"
                                                    checked={selectedRider?._id === r._id}
                                                    onChange={() => setSelectedRider(r)}
                                                />
                                            </td>
                                            <td>{r.name}</td>
                                            <td>{r.phone}</td>
                                            <td>{r.email}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                disabled={!selectedRider || assignMut.isLoading}
                                onClick={() => assignMut.mutate()}
                            >
                                Confirm
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    setSelectedParcel(null);
                                    setSelectedRider(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
