import React from 'react';
import {Outlet} from "react-router";
import Navbar from "../pages/shared/navbar/Navbar.jsx";
import Footer from "../pages/shared/Footer/Footer.jsx";

const RootLayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayouts;


