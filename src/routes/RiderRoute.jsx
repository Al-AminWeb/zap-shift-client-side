import React from 'react';
import useAuth from "../hooks/useAuth.jsx";
import useUserRole from "../hooks/useUserRole.jsx";
import Loading from "../pages/shared/Loading/Loading.jsx";
import {Navigate} from "react-router";

const RiderRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading || roleLoading) {
        return <Loading />;
    }

    if(!user || role!=='rider'){
        return <Navigate to='/forbidden'></Navigate>
    }

    return children;

};

export default RiderRoute;
