import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const email = user?.email;

    // Load completed parcels for the current rider
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
            return res.data;
        },
    });

    // Calculate rider's earning
    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        return parcel.sender_center === parcel.receiver_center ? cost * 0.8 : cost * 0.3;
    };

    // Cashout mutation
    const { mutateAsync: cashout } = useMutation({
        mutationFn: async (parcelId) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["completedDeliveries"]);
        },
    });

    // Handle cashout action
    const handleCashout = (parcelId) => {
        Swal.fire({
            title: "Confirm Cashout",
            text: "You are about to cash out this delivery.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cash Out",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                cashout(parcelId)
                    .then(() => {
                        Swal.fire("Success", "Cashout completed.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to cash out. Try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>

            {isLoading ? (
                <p>Loading completed deliveries...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No deliveries yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-sm">
                        <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Title</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Delivered At</th>
                            <th>Fee (৳)</th>
                            <th>Your Earning (৳)</th>
                            <th>Cashout</th>
                        </tr>
                        </thead>
                        <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id}>
                                <td>{parcel.tracking_id || parcel._id.slice(-6)}</td>
                                <td>{parcel.title}</td>
                                <td className="capitalize">{parcel.type}</td>
                                <td>{parcel.receiverCenter}</td>
                                <td>{new Date(parcel.deliveredAt || parcel.assignedAtISO).toLocaleString()}</td>
                                <td>৳{parcel.cost}</td>
                                <td className="font-semibold text-green-600">
                                    ৳{calculateEarning(parcel).toFixed(2)}
                                </td>
                                <td>
                                    {parcel.cashout_status === "cashed_out" ? (
                                        <span className="badge badge-success text-xs px-2 py-1">Cashed Out</span>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleCashout(parcel._id)}
                                        >
                                            Cashout
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompletedDeliveries;
