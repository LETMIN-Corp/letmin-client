import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

const PublicRoutes = () => {
    const { getRole } : any = useContext(AuthContext);

    let userRole = getRole(); 

    if (userRole != undefined && userRole != '') {
        return (
            <Navigate to={`/${userRole}`}/>
        );
    }

    return <Outlet />;
}

export default PublicRoutes
