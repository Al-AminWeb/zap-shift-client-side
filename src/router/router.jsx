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
    }
]);

