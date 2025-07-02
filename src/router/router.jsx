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
            {
                path: 'pendingRiders',
                Component:PendingRiders
            },
            {
                path:'activeRiders',
                Component:ActiveRider
            },
            {
                path:'makeAdmin',
                Component:MakeAdmin
            }
        ]
    }
]);

