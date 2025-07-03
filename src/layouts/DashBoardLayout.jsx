import React from 'react';
import {NavLink, Outlet} from "react-router";
import ProFast from "../pages/shared/profast/ProFast.jsx";
import {
    HiHome,
    HiOutlineCube,
    HiCreditCard,
    HiOutlineSearchCircle,
    HiUserCircle
} from 'react-icons/hi';
import useUserRole from "../hooks/useUserRole.jsx";
import {HiUserPlus} from "react-icons/hi2";

const DashBoardLayout = () => {

    const {role,roleLoading}= useUserRole();
    // console.log("role:", role);
    // console.log("roleLoading:", roleLoading);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet/>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProFast/>
                    <li>
                        <NavLink to="/dashboard">
                            <HiHome className="text-xl"/>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels">
                            <HiOutlineCube className="text-xl"/>
                            My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <HiCreditCard className="text-xl"/>
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track">
                            <HiOutlineSearchCircle className="text-xl"/>
                            Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">
                            <HiUserCircle className="text-xl"/>
                            Update Profile
                        </NavLink>
                    </li>
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <HiUserPlus className="text-xl" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/activeRiders">
                                    <HiUserCircle className="text-xl"/>
                                    Active Riders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/pendingRiders">
                                    <HiUserCircle className="text-xl"/>
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/makeAdmin"
                                    className={({isActive}) =>
                                        `flex items-center gap-2 p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-base-200'}`
                                    }
                                >
                                    <span>Make Admin</span>
                                </NavLink>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;
