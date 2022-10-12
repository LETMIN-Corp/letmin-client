import { useEffect } from 'react';

import Footer from '../../Components/Layouts/Footer';
import UserMenu from '../../Components/Layouts/UserMenu';

const UserDefault: React.FC = ({ children }) => {
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
