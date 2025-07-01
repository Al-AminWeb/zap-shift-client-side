// src/pages/admin/ActiveRider.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxios.jsx";

const ActiveRider = () => {
    const axiosSecure   = useAxiosSecure();
    const queryClient   = useQueryClient();
    const [search, setSearch] = useState('');

    /* ── fetch all active riders ───────────── */
    const { data: riders = [], isLoading } = useQuery({
        queryKey: ['active-riders'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/riders/active'); // <-- backend returns active only
            return data;
        }
    });

    /* ── deactivate rider ──────────────────── */
    const deactivate = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/riders/${id}`, { status: 'inactive' });
        },
        onSuccess: () => {
            toast.success('Rider deactivated');
            queryClient.invalidateQueries(['active-riders']);
        },
        onError: () => toast.error('Failed to deactivate rider')
    });

    /* ── filter by search term ─────────────── */
    const filtered = riders.filter(r =>
        r.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (isLoading) return <p className="text-center py-8">Loading…</p>;

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🛵 Active Riders</h2>

                <input
                    type="text"
                    placeholder="Search by name…"
                    className="input input-bordered w-60"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>E‑mail</th>
                    <th>Phone</th>
                    <th>Region / District</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map((r, i) => (
                    <tr key={r._id}>
                        <td>{i + 1}</td>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td>{r.phone}</td>
                        <td>{r.region} / {r.district}</td>
                        <td>{r.age}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-error"
                                disabled={deactivate.isLoading}
                                onClick={() => deactivate.mutate(r._id)}
                            >
                                Deactivate
                            </button>
                        </td>
                    </tr>
                ))}

                {filtered.length === 0 && (
                    <tr>
                        <td colSpan="7" className="text-center py-6 text-gray-500">
                            No riders found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveRider;
