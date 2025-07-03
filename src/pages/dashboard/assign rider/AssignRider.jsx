// src/pages/admin/AssignRider.jsx
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

   // if you have one
import { format } from 'date-fns';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../shared/Loading/Loading.jsx";

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    /* ── fetch parcels that are Paid + Not Collected ── */
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['unassigned-parcels'],
        queryFn: async () => {
            // backend should filter by the two statuses
            const { data } = await axiosSecure.get('/parcels/unassigned');
            return data;
        }
    });

    const handleAssign = (parcel) => {
        toast(`Assign Rider clicked for ${parcel._id}`);
        // later: open modal or PATCH /parcels/:id/assign
    };

    if (isLoading) return <Loading />;

    return (
        <div className="overflow-x-auto shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">📦 Parcels Ready for Rider Assignment</h2>

            <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                <tr>
                    <th>#</th>
                    <th>Tracking ID</th>
                    <th>Title</th>
                    <th>Cost (৳)</th>
                    <th>Sender Region</th>
                    <th>Receiver Region</th>
                    <th>Created At</th>
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
                        <td>{p.receiverRegion}</td>
                        <td>{format(new Date(p.createdAtISO), 'yyyy-MM-dd')}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleAssign(p)}
                            >
                                Assign Rider
                            </button>
                        </td>
                    </tr>
                ))}

                {parcels.length === 0 && (
                    <tr>
                        <td colSpan="8" className="text-center py-6 text-gray-500">
                            No parcels waiting for assignment.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AssignRider;
