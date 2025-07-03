import React from 'react';
import useUserRole from "../hooks/useUserRole.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Loading from "../pages/shared/Loading/Loading.jsx";
import {Navigate} from "react-router";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading) {
        return <Loading />;
    }

    if(!user || role!=='admin'){
        return <Navigate to='/forbidden'></Navigate>
    }

    return children;
};

export default AdminRoute;
