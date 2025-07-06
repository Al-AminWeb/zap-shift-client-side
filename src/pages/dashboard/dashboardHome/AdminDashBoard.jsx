import { useQuery } from '@tanstack/react-query';
import {
    FaBoxOpen,
    FaShippingFast,
    FaCheckCircle,
    FaTruckLoading,
} from 'react-icons/fa';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const statusIcons = {
    'Not Collected': <FaBoxOpen className="text-4xl text-yellow-500" />,
    'rider assigned': <FaTruckLoading className="text-4xl text-blue-500" />,
    'rider-assigned': <FaTruckLoading className="text-4xl text-blue-400" />,
    'in-transit': <FaShippingFast className="text-4xl text-indigo-500" />,
    'delivered': <FaCheckCircle className="text-4xl text-green-500" />,
};

const statusColors = {
    'Not Collected': '#facc15',      // yellow-400
    'rider assigned': '#60a5fa',     // blue-400
    'rider-assigned': '#3b82f6',     // blue-500
    'in-transit': '#6366f1',         // indigo-500
    'delivered': '#10b981',          // green-500
};

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['delivery-status-count'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery/status-count');
            return res.data;
        },
    });

    if (isError) {
        console.error("❌ Error loading delivery data:", error);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
                📦 Parcel Delivery Status Overview
            </h1>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <span className="loading loading-bars loading-lg text-primary" />
                </div>
            )}

            {isError && (
                <div className="text-center text-red-500">
                    Failed to load status data.
                </div>
            )}

            {!isLoading && !isError && (
                <>
                    {/* 🟢 Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                        {data.map(({ status, count }) => (
                            <div
                                key={status}
                                className={`card shadow-md ${statusColors[status] || 'bg-base-200'} p-4`}
                            >
                                <div className="flex flex-col items-center text-center gap-2">
                                    {statusIcons[status] || <FaBoxOpen className="text-4xl text-gray-400" />}
                                    <h2 className="text-lg font-semibold capitalize">
                                        {status.replace(/-/g, ' ')}
                                    </h2>
                                    <p className="text-3xl font-extrabold">{count}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 🟢 Pie Chart */}
                    <div className="w-full h-96 flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    label={({ name, percent }) =>
                                        `${name.replace(/-/g, ' ')} (${(percent * 100).toFixed(0)}%)`
                                    }
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={statusColors[entry.status] || '#ccc'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
