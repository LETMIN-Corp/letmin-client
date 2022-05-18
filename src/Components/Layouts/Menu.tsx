import LogoImage from '../../Assets/logo.svg';
import { useState } from 'react';
import PrimaryLink from '../Links/PrimaryLink';
import { Link } from 'react-router-dom';
import MenuLink from '../Links/MenuLink';

interface ButtonsInterface {
    text: string,
    path: string,
    isLink: boolean,
}
interface ComponentInterface {
    menuButtons: Array<ButtonsInterface>
    showMenu?: boolean,
};

const Header : React.FC<ComponentInterface> = ({ menuButtons, showMenu }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <>
            <header className='fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg'>
                <Link to='/'>
                    <img src={ LogoImage } className='w-12 md:w-16' />
                </Link>

                <div className={`${[showMenu ? 'md:hidden' : '']} block`}>
                    {
                        (menuButtons && (menuButtons.length === 1)) && (
                            <div>
                                {
                                    <PrimaryLink
                                        text={ menuButtons[0].text }
                                        path={ menuButtons[0].path }
                                    />
                                }
                            </div>
                        )
                    }

                    {
                        (menuButtons && !(menuButtons.length === 1)) && (
                            <>
                                <div>
                                    <i onClick={ () => setMenuIsOpen(true) } className='fa-solid fa-bars text-2xl block md:hidden cursor-pointer'></i>
                                </div>

                                <div className={`${[menuIsOpen ? 'block' : 'hidden']} md:block`}>
                                    {
                                        <div className='w-screen min-h-screen bg-white fixed top-0 left-0 md:w-full md:min-h-0 md:sticky'>
                                            <div className='w-full flex items-center justify-between px-4 py-4 md:hidden'>
                                                <div></div>
                                                <i 
                                                    onClick={ () => setMenuIsOpen(false) } 
                                                    className='fa-solid fa-circle-xmark text-3xl cursor-pointer'>
                                                </i>
                                            </div>

                                            <div className='px-14 text-center mt-20 md:mt-0 md:flex md:p-1'>
                                                {
                                                    menuButtons.map((button : ButtonsInterface) => {
                                                        if(button.isLink) {
                                                            if(showMenu) {
                                                                return (
                                                                    <MenuLink
                                                                        text={ button.text }
                                                                        path={ button.path }
                                                                        key={ button.path }
                                                                    />
                                                                );
                                                            }

                                                            return (
                                                                <PrimaryLink
                                                                    text={ button.text }
                                                                    path={ button.path }
                                                                    key={ button.path }
                                                                >
                                                                    { button.text }
                                                                </PrimaryLink>
                                                            );
                                                        }
                                                        
                                                        return (
                                                            <a
                                                                className='block mb-10 md:mb-0 md:flex items-center text-black md:mr-5 hover:text-primary ease-out duration-200'
                                                                href={ button.path }
                                                                key={ button.path }
                                                                onClick={ () => setMenuIsOpen(false) }
                                                            >
                                                                { button.text }
                                                            </a>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </header>
            {
                showMenu && (
                    <>
                        <div className='hidden md:block h-screen bg-dark-purple pl-5 mt-20 drop-shadow-lg'>
                            {
                                (menuButtons) && (
                                    menuButtons.map((button : ButtonsInterface, key) => {
                                        if(button.isLink) {
                                            return (
                                                <MenuLink
                                                    text={ button.text }
                                                    path={ button.path + '/' + key }
                                                    key={ button.path }
                                                />
                                            );
                                        }
                                    })
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Header;
