// src/pages/admin/MakeAdmin.jsx
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";



/**
 * Simple admin page:
 *  ▸ Search user by e‑mail
 *  ▸ Promote to admin or demote to user
 */
const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [query, setQuery] = useState('');
    const [debounced, setDebounced] = useState('');

    /* small debounced so we don't hit backend on every keystroke */
    useEffect(() => {
        const id = setTimeout(() => setDebounced(query.trim()), 400);
        return () => clearTimeout(id);
    }, [query]);

    /* ── search request ─────────────────────────── */
    const { data: users = [], isFetching } = useQuery({
        queryKey: ['search-users', debounced],
        enabled: debounced.length > 0,
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users/search', { params: { q: debounced } });
            return data;
        }
    });

    /* ── role update mutation ───────────────────── */
    const roleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            await axiosSecure.patch(`/users/${id}/role`, { role });
        },
        onSuccess: () => {
            toast.success('Role updated');
            queryClient.invalidateQueries(['search-users', debounced]);
        },
        onError: () => toast.error('Failed to update role')
    });
    console.log("Users result:", users);
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">👤 User Role Manager</h2>

            {/* search box */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Search by e‑mail"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {isFetching && <p className="text-center">Searching…</p>}

            {/* results table */}
            {users.length > 0 && (
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>E‑mail</th>
                        <th>Current Role</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, idx) => (
                        <tr key={u._id}>
                            <td>{idx + 1}</td>
                            <td>{u.email}</td>
                            <td className="capitalize">{u.role || 'user'}</td>
                            <td>{u.created_at?.slice(0, 10) || '—'}</td>

                            <td>
                                {u.role === 'admin' ? (
                                    <button
                                        className="btn btn-sm btn-error"
                                        disabled={roleMutation.isLoading}
                                        onClick={() => roleMutation.mutate({ id: u._id, role: 'user' })}
                                    >
                                        Remove Admin
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-success"
                                        disabled={roleMutation.isLoading}
                                        onClick={() => roleMutation.mutate({ id: u._id, role: 'admin' })}
                                    >
                                        Make Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* no results text */}
            {debounced && !isFetching && users.length === 0 && (
                <p className="text-center text-gray-500 py-6">No users found.</p>
            )}
        </div>
    );
};

export default MakeAdmin;
