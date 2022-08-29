import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

const PrivateRoutes = ({ role }: any) => {
    const { getRole }:any = useContext(AuthContext);

    let userRole = getRole(); 

    if (userRole !== role) {
        return (
            <Navigate to="/register"/>
        );
    }

    return <Outlet />;
}

export default PrivateRoutes
