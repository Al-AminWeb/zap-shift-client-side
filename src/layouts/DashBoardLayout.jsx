import React from 'react';
import {NavLink, Outlet} from "react-router";
import ProFast from "../pages/shared/profast/ProFast.jsx";
import {
    HiHome,
    HiOutlineCube,
    HiCreditCard,
    HiOutlineSearchCircle,
    HiUserCircle, HiClipboardList, HiCheckCircle
} from 'react-icons/hi';
import useUserRole from "../hooks/useUserRole.jsx";
import {HiUserPlus} from "react-icons/hi2";

const DashBoardLayout = () => {

    const {role, roleLoading} = useUserRole();
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
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
                    <ProFast/>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                 ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                            }
                        >
                            <HiHome className="text-xl"/>
                            Dashboard Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/myParcels"
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                 ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                            }
                        >
                            <HiOutlineCube className="text-xl"/>
                            My Parcels
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/paymentHistory"
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                 ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                            }
                        >
                            <HiCreditCard className="text-xl"/>
                            Payment History
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/track"
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                 ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                            }
                        >
                            <HiOutlineSearchCircle className="text-xl"/>
                            Track a Package
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/profile"
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                 ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                            }
                        >
                            <HiUserCircle className="text-xl"/>
                            Update Profile
                        </NavLink>
                    </li>
                    {!roleLoading && role === 'rider' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/pending-deliveries"
                                    className={({isActive}) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
       ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiClipboardList className="text-xl"/>
                                    Pending Deliveries
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/completed-deliveries"
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
       ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiCheckCircle className="text-xl" />
                                    Completed Deliveries
                                </NavLink>
                            </li>

                        </>
                    }

                    {/* Admin-only routes */}
                    {!roleLoading && role === 'admin' && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/assign-rider"
                                    className={({isActive}) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                         ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiUserPlus className="text-xl"/>
                                    Assign Rider
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/activeRiders"
                                    className={({isActive}) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                         ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiUserCircle className="text-xl"/>
                                    Active Riders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/pendingRiders"
                                    className={({isActive}) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                         ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiUserCircle className="text-xl"/>
                                    Pending Riders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/makeAdmin"
                                    className={({isActive}) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                         ${isActive ? 'bg-primary text-white' : 'hover:bg-base-300'}`
                                    }
                                >
                                    <HiUserCircle className="text-xl"/>
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>

            </div>
        </div>
    );
};

export default DashBoardLayout;
