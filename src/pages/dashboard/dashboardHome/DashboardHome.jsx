import React from 'react';
import useUserRole from "../../../hooks/useUserRole.jsx";
import Loading from "../../shared/Loading/Loading.jsx";
import AdminDashBoard from "./AdminDashBoard.jsx";
import RiderDashBoard from "./RiderDashBoard.jsx";
import Forbidden from "../../forbidden/Forbidden.jsx";

const DashboardHome = () => {
  const {role, roleLoading}= useUserRole();
  if (roleLoading) {
     return <Loading />
  }
  if (role === "user") {
        return <userDashBoard />;
  }
  else if (role === "admin") {
      return <AdminDashBoard />;
  }
  else if (role === "rider") {
      return <RiderDashBoard />;
  }
  else{
      return <Forbidden/>
  }
};

export default DashboardHome;
