import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
            return res.data;
        },
    });

    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        return parcel.sender_center === parcel.receiver_center ? cost * 0.8 : cost * 0.3;
    };

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();

    const earnings = parcels.map(parcel => ({
        ...parcel,
        earning: calculateEarning(parcel),
        deliveredAt: new Date(parcel.delivered_at).getTime(),
    }));

    const totalEarning = earnings.reduce((sum, p) => sum + p.earning, 0);
    const cashedOut = earnings.filter(p => p.cashout_status === "cashed_out").reduce((sum, p) => sum + p.earning, 0);
    const pending = totalEarning - cashedOut;

    const earningsToday = earnings.filter(p => p.deliveredAt >= startOfToday).reduce((sum, p) => sum + p.earning, 0);
    const earningsThisWeek = earnings.filter(p => p.deliveredAt >= startOfWeek).reduce((sum, p) => sum + p.earning, 0);
    const earningsThisMonth = earnings.filter(p => p.deliveredAt >= startOfMonth).reduce((sum, p) => sum + p.earning, 0);
    const earningsThisYear = earnings.filter(p => p.deliveredAt >= startOfYear).reduce((sum, p) => sum + p.earning, 0);

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-3xl font-bold mb-6">📊 My Earnings Summary</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-blue-100 rounded-xl p-4 text-center shadow">
                            <p className="text-sm font-medium">Total Earned</p>
                            <p className="text-2xl font-bold text-blue-700">৳{totalEarning.toFixed(2)}</p>
                        </div>
                        <div className="bg-green-100 rounded-xl p-4 text-center shadow">
                            <p className="text-sm font-medium">Cashed Out</p>
                            <p className="text-2xl font-bold text-green-700">৳{cashedOut.toFixed(2)}</p>
                        </div>
                        <div className="bg-yellow-100 rounded-xl p-4 text-center shadow">
                            <p className="text-sm font-medium">Pending</p>
                            <p className="text-2xl font-bold text-yellow-700">৳{pending.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4 text-center shadow">
                            <p className="text-sm font-medium">Deliveries</p>
                            <p className="text-2xl font-bold text-gray-700">{parcels.length}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <div className="bg-white rounded-xl p-4 text-center shadow border">
                            <p className="text-sm text-gray-500">Today</p>
                            <p className="text-xl font-semibold text-gray-800">৳{earningsToday.toFixed(2)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow border">
                            <p className="text-sm text-gray-500">This Week</p>
                            <p className="text-xl font-semibold text-gray-800">৳{earningsThisWeek.toFixed(2)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow border">
                            <p className="text-sm text-gray-500">This Month</p>
                            <p className="text-xl font-semibold text-gray-800">৳{earningsThisMonth.toFixed(2)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow border">
                            <p className="text-sm text-gray-500">This Year</p>
                            <p className="text-xl font-semibold text-gray-800">৳{earningsThisYear.toFixed(2)}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyEarnings;
