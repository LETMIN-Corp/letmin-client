import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Utils/useAuth';

const PublicRoutes = () => {
    const auth = useAuth();
    let userRole = auth.getRole(); 

    if (userRole != undefined && userRole != '') {
        return (
            <Navigate to={`/${userRole}`}/>
        );
    }

    return <Outlet />;
}

export default PublicRoutes
