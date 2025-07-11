import {
    createBrowserRouter,
} from "react-router";
import RootLayouts from "../layouts/RootLayouts.jsx";
import Home from "../pages/Home/home/Home.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Authentication/login/LogIn.jsx";
import Register from "../pages/Authentication/Register/Register.jsx";
import Coverage from "../pages/covarage/Coverage.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import SendParcel from "../pages/send Parcel/SendParcel.jsx";
import DashBoardLayout from "../layouts/DashBoardLayout.jsx";
import MyParcels from "../pages/dashboard/my parcels/MyParcels.jsx";
import Payment from "../pages/dashboard/payment/Payment.jsx";
import PaymentHistory from "../pages/dashboard/payment history/PaymentHistory.jsx";
import TrackParcel from "../pages/dashboard/track parcel/TrackParcel.jsx";
import BeARider from "../pages/dashboard/be a rider/BeARider.jsx";
import PendingRiders from "../pages/dashboard/pending riders/PendingRiders.jsx";
import ActiveRider from "../pages/dashboard/active riders/ActiveRider.jsx";
import MakeAdmin from "../pages/dashboard/make admin/MakeAdmin.jsx";
import Forbidden from "../pages/forbidden/Forbidden.jsx";
import AdminRoute from "../routes/AdminRoute.jsx";
import AssignRider from "../pages/dashboard/assign rider/AssignRider.jsx";
import RiderRoute from "../routes/RiderRoute.jsx";
import PendingDeliveries from "../pages/dashboard/Pending delivery/PendingDeliveries.jsx";
import CompletedDeliveries from "../pages/dashboard/completed deliveries/CompletedDeliveries.jsx";
import MyEarnings from "../pages/dashboard/My earnings/MyEarnings.jsx";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
       Component:RootLayouts,
        children: [
            {
               index:true,
                Component:Home,
            },
            {
                path: '/coverage',
                Component:Coverage,
            },
            {
                path: '/sendParcel',
                element:<PrivateRoute>
                    <SendParcel />
                </PrivateRoute>
            },
            {
                path: '/beARider',
                element:<PrivateRoute>
                    <BeARider />
                </PrivateRoute>
            }

        ]
    },
    {
        path:'/',
        Component:AuthLayout,
    children:[
        {
            path:'/login',
            Component:Login,
        },
        {
            path:'/register',
            Component:Register,
        },
        {
            path: 'forbidden',
            Component:Forbidden,
        }
    ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute>
            <DashBoardLayout/>
        </PrivateRoute>,
        children:[
            {
                index: true,
                Component:DashboardHome,
            },
            {
                path:'myParcels',
                Component:MyParcels
            },
            {
              path: 'payment/:parcelId',
              Component:Payment
            },
            {
                path: 'paymentHistory',
                Component:PaymentHistory
            },
            {
                path: 'track',
                Component:TrackParcel
            },
            //rider only routes
            {
               path: 'pending-deliveries',
                element: <RiderRoute>
                    <PendingDeliveries/>
                </RiderRoute>
            },
            {
                path:'completed-deliveries',
                element: <RiderRoute>
                  <CompletedDeliveries/>
                </RiderRoute>
            },
            {
                path:'earnings',
                element: <RiderRoute>
                    <MyEarnings/>
                </RiderRoute>
            },
            {
                path: 'assign-rider',
                element: <AdminRoute>
                    <AssignRider />
                </AdminRoute>
            },
            {
                path: 'pendingRiders',
                element: <AdminRoute>
                  <PendingRiders />
                </AdminRoute>
            },
            {
                path:'activeRiders',
                element: <AdminRoute>
                    <ActiveRider />
                </AdminRoute>
            },
            {
                path:'makeAdmin',
                element: <AdminRoute>
                    <MakeAdmin />
                </AdminRoute>
            }
        ]
    }
]);

