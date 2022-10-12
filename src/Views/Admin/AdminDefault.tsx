import { useEffect } from 'react';

import AdminMenu from '../../Components/Layouts/AdminMenu';
import Footer from '../../Components/Layouts/Footer';

interface ComponentInterface {
    children: React.ReactNode;
}

const AdminDefault: React.FC<ComponentInterface> = ({ children }) => {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className="flex">
            <AdminMenu />
            <div className="w-full flex flex-col justify-between">
                <div className="mt-16 md:mt-20">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default AdminDefault;
