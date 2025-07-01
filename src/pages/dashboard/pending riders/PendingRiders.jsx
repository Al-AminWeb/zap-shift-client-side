// src/pages/admin/PendingRiders.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxios.jsx";
import Loading from "../../shared/Loading/Loading.jsx";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState(null);      // rider chosen for modal

    /* ── fetch pending riders ─────────────────────────── */
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/riders/pending');
            return data;
        }
    });

    /* ── approve / reject mutation ────────────────────── */
    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            await axiosSecure.patch(`/riders/${id}`, { status });
        },
        onSuccess: (_, variables) => {
            toast.success(`Rider ${variables.status === 'approved' ? 'approved' : 'rejected'}`);
            // refresh list
            queryClient.invalidateQueries(['pending-riders']);
            setSelected(null);   // close modal
        },
        onError: () => toast.error('Action failed')
    });

    if (isLoading) return <Loading/>;

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">🛵 Pending Rider Applications</h2>

            <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>E‑mail</th>
                    <th>Phone</th>
                    <th>Region&nbsp;/&nbsp;District</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {riders.map((r, i) => (
                    <tr key={r._id}>
                        <td>{i + 1}</td>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td>{r.phone}</td>
                        <td>{r.region} / {r.district}</td>
                        <td className="flex gap-2">
                            <button
                                className="btn btn-sm btn-info"
                                onClick={() => setSelected(r)}
                            >
                                View
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => mutation.mutate({ id: r._id, status: 'approved' })}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => mutation.mutate({ id: r._id, status: 'rejected' })}
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* ── modal ─────────────────────────────────────── */}
            {selected && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-lg">
                        <h3 className="font-bold text-lg mb-3">Rider Details</h3>
                        <div className="space-y-1 text-sm">
                            <p><strong>Name:</strong> {selected.name}</p>
                            <p><strong>Email:</strong> {selected.email}</p>
                            <p><strong>Phone:</strong> {selected.phone}</p>
                            <p><strong>Age:</strong> {selected.age}</p>
                            <p><strong>Region:</strong> {selected.region}</p>
                            <p><strong>District:</strong> {selected.district}</p>
                            <p><strong>NID:</strong> {selected.nid}</p>
                            <p><strong>Bike Brand:</strong> {selected.bikeBrand}</p>
                            <p><strong>Bike Reg#:</strong> {selected.bikeNumber}</p>
                            {selected.other && <p><strong>Other:</strong> {selected.other}</p>}
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={() => mutation.mutate({ id: selected._id, status: 'approved' })}
                                disabled={mutation.isLoading}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => mutation.mutate({ id: selected._id, status: 'rejected' })}
                                disabled={mutation.isLoading}
                            >
                                Reject
                            </button>
                            <button className="btn" onClick={() => setSelected(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
