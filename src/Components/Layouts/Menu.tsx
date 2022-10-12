import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoImage from '../../Assets/logo.svg';
import useAuth from '../../Utils/useAuth';
import MenuLink from '../Links/MenuLink';
import PrimaryLink from '../Links/PrimaryLink';

interface ButtonsInterface {
    text: string;
    path: string;
    isLink?: boolean;
    hasFunction?: boolean;
    handleClick?: () => void;
}
interface ComponentInterface {
    menuButtons: Array<ButtonsInterface>;
    showMenu?: boolean;
}

const Header: React.FC<ComponentInterface> = ({ menuButtons, showMenu }) => {
    const auth = useAuth();
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <>
            <header className="fixed z-40 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg">
                <Link to="/">
                    <img src={LogoImage} className="w-12 md:w-16" alt="" />
                </Link>
                <div className={`${[showMenu ? 'md:hidden' : '']} block`}>
                    {menuButtons && (
                        <>
                            <div>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    onClick={() => setMenuIsOpen(true)}
                                    className="text-2xl block md:hidden cursor-pointer"
                                />
                            </div>

                            <div
                                className={`${[
                                    menuIsOpen ? 'block' : 'hidden',
                                ]} md:block`}
                            >
                                {
                                    <div className="w-screen min-h-screen bg-white fixed top-0 left-0 md:w-full md:min-h-0 md:sticky">
                                        <div className="w-full flex items-center justify-between px-4 py-4 md:hidden">
                                            <div></div>
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                onClick={() => setMenuIsOpen(false)}
                                                className="text-3xl cursor-pointer"
                                            />
                                        </div>

                                        <div className="px-14 text-center mt-20 md:mt-0 md:flex md:p-1">
                                            {menuButtons.map(
                                                (button: ButtonsInterface) => {
                                                    if (button.hasFunction) {
                                                        if (button.isLink) {
                                                            return (
                                                                <button
                                                                    className="block mx-auto rounded-md bg-white text-primary font-bold py-2 px-4 drop-shadow-lg border-2 border-primary md:text-lg hover:text-white hover:bg-primary ease-out duration-200"
                                                                    key={button.path}
                                                                    onClick={
                                                                        button.handleClick
                                                                    }
                                                                >
                                                                    {button.text}
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <button
                                                                className="block mb-10 md:mb-0 md:flex items-center text-black md:mr-5 hover:text-primary ease-out duration-200"
                                                                key={button.path}
                                                                onClick={
                                                                    button.handleClick
                                                                }
                                                            >
                                                                {button.text}
                                                            </button>
                                                        );
                                                    }

                                                    if (button.isLink) {
                                                        if (showMenu) {
                                                            return (
                                                                <MenuLink
                                                                    text={button.text}
                                                                    path={button.path}
                                                                    key={button.path}
                                                                />
                                                            );
                                                        }

                                                        return (
                                                            <PrimaryLink
                                                                text={button.text}
                                                                path={button.path}
                                                                key={button.path}
                                                            >
                                                                {button.text}
                                                            </PrimaryLink>
                                                        );
                                                    }

                                                    return (
                                                        <a
                                                            className="block mb-10 md:mb-0 md:flex items-center text-black md:mr-5 hover:text-primary ease-out duration-200"
                                                            href={button.path}
                                                            key={button.path}
                                                            onClick={() =>
                                                                setMenuIsOpen(false)
                                                            }
                                                        >
                                                            {button.text}
                                                        </a>
                                                    );
                                                },
                                            )}
                                            {auth.isAuthenticated && (
                                                <button
                                                    className="block mx-auto rounded-md bg-white text-red font-bold py-2 px-4 drop-shadow-lg border-2 border-red md:text-lg"
                                                    onClick={auth.signOut}
                                                >
                                                    Logout
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    )}
                </div>
            </header>
            {showMenu && (
                <>
                    <div className="md:pl-5">
                        <div className="w-full md:w-52"></div>
                    </div>
                    <div className="hidden md:block h-screen bg-dark-purple pl-5 mt-20 drop-shadow-lg fixed md:flex flex-col justify-between pb-20">
                        <div>
                            {menuButtons &&
                                menuButtons.map((button: ButtonsInterface) => {
                                    if (button.isLink) {
                                        return (
                                            <MenuLink
                                                text={button.text}
                                                path={button.path}
                                                key={button.path}
                                            />
                                        );
                                    }
                                })}
                        </div>
                        {auth.isAuthenticated && (
                            <button
                                className="flex my-10 w-full block md:w-52 md:text-gray font-medium md:hover:text-white ease-out duration-200"
                                onClick={auth.signOut}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Header;
