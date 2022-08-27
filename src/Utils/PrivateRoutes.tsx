import { Outlet, Navigate } from 'react-router-dom'
import React, { useContext, useEffect } from "react";
import { AuthContext, AuthState } from "../Context/AuthContextProvider";

const PrivateRoutes = ({children , role }: any) => {

    // const { isAuthenticated, userData, getRole }:any = useContext(AuthContext);

    // let userRole = getRole();
    // let isAuth = isAuthenticated;

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         userRole = userData.role;
    //     }
    // }, [isAuthenticated, userData]);

    const isAuthenticated = true;
    let userRole = 'user';

    console.log('private route', isAuthenticated, userRole, role);

    if (!isAuthenticated && userRole !== role) {
        return (
            <Navigate to="/register"/>
        );
    }

    return children;
}

export default PrivateRoutes