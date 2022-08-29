import { Outlet, Navigate } from 'react-router-dom'
import React, { useContext, useEffect } from "react";
import { AuthContext, AuthState } from "../Context/AuthContextProvider";

const PrivateRoutes = ({ role }: any) => {
    const { getRole }:any = useContext(AuthContext);

    let userRole = getRole(); 

    //console.log('private route', userRole);

    if (userRole !== role) {
        return (
            <Navigate to="/register"/>
        );
    }

    return <Outlet />;
}

export default PrivateRoutes