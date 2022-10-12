import { useEffect } from 'react';

import Footer from '../../Components/Layouts/Footer';
import UserMenu from '../../Components/Layouts/UserMenu';

interface ComponentInterface {
    children: React.ReactNode;
}

const UserDefault: React.FC<ComponentInterface> = ({ children }) => {
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className="flex">
            <UserMenu />
            <div className="w-full flex flex-col justify-between">
                <div className="mt-16 md:mt-20">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default UserDefault;
