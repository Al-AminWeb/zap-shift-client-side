import {
    createBrowserRouter,
} from "react-router";
import RootLayouts from "../layouts/RootLayouts.jsx";
import Home from "../pages/Home/home/Home.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Authentication/login/LogIn.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
       Component:RootLayouts,
        children: [
            {
               index:true,
                Component:Home,
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
        }
    ]
    }
]);

