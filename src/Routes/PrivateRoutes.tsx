import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Utils/useAuth';

interface Props {
    roles: Array<any>
}

const PrivateRoutes = ({ roles }: Props) => {
    const auth = useAuth();

    let userRole = auth.getRole();

    if (userRole != undefined && userRole != '' && roles.includes(userRole)) {
        return (
            <Outlet />
        );
    }

    return (
        <Navigate to="/"/>
    );
}

export default PrivateRoutes
