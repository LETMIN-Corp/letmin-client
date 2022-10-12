import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../Utils/useAuth';

interface Props {
    roles: Array<any>;
}

const PrivateRoutes = ({ roles }: Props) => {
    const auth = useAuth();

    const userRole = auth.getRole();

    if (userRole != undefined && userRole != '' && roles.includes(userRole)) {
        return <Outlet />;
    }

    return <Navigate to="/" />;
};

export default PrivateRoutes;
