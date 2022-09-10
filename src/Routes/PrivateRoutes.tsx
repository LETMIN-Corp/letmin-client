import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Utils/useAuth';

const PrivateRoutes = ({ role }: any) => {
    const auth = useAuth();

    let userRole = auth.getRole(); 

    if (userRole !== role) {
        return (
            <Navigate to="/register"/>
        );
    }

    return <Outlet />;
}

export default PrivateRoutes
