import LogoImage from '../../Assets/logo.svg';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import PrimaryLink from '../Links/PrimaryLink';
import { Link } from 'react-router-dom';
import MenuLink from '../Links/MenuLink';

interface ComponentInterface {
    showMenu?: boolean,
};
interface ButtonsInterface {
    text: string,
    path: string,
    isLink: boolean,
}

interface PageButtonsInterface {
    [key: string] : Array<ButtonsInterface>
}

const Header : React.FC<ComponentInterface> = ({ showMenu }) => {
    const pagePath : string  = useLocation().pathname;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const pageButtons : PageButtonsInterface = {
        '/' : [
            {
                text: 'Diferencial',
                path: '#differential',
                isLink: false,
            },
            {
                text: 'Sobre',
                path: '#about',
                isLink: false,
            },
            {
                text: 'Quem somos',
                path: '#who-we-are',
                isLink: false,
            },
            {
                text: 'Cadastre-se',
                path: '/register',
                isLink: true,
            },
        ],
        '/register' : [
            {
                text: 'Home',
                path: '/',
                isLink: true,
            },
        ],
        '/register/company' : [
            {
                text: 'Voltar para o cadastro',
                path: '/register',
                isLink: true,
            }
        ],
        '/company/' : [
            {
                text: 'Indicadores',
                path: '/1',
                isLink: true,
            },
            {
                text: 'Banco de Talentos',
                path: '/2',
                isLink: true,
            },
            {
                text: 'Combinações',
                path: '/3',
                isLink: true,
            },
            {
                text: 'Buscar Talentos',
                path: '/4',
                isLink: true,
            },
            {
                text: 'Meus Dados',
                path: '/5',
                isLink: true,
            },
        ]
    };

    return (
        <>
            <header className='fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg'>
                <Link to='/'>
                    <img src={ LogoImage } className='w-12 md:w-16' />
                </Link>

                <div className={`${[showMenu ? 'md:hidden' : '']} block`}>
                    {
                        (pageButtons[pagePath] && (pageButtons[pagePath].length === 1)) && (
                            <div>
                                {
                                    <PrimaryLink
                                        text={ pageButtons[pagePath][0].text }
                                        path={ pageButtons[pagePath][0].path }
                                    />
                                }
                            </div>
                        )
                    }

                    {
                        (pageButtons[pagePath] && !(pageButtons[pagePath].length === 1)) && (
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
                                                    pageButtons[pagePath].map((button : ButtonsInterface) => {
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
                                (pageButtons[pagePath]) && (
                                    pageButtons[pagePath].map((button : ButtonsInterface) => {
                                        if(button.isLink) {
                                            return (
                                                <MenuLink
                                                    text={ button.text }
                                                    path={ button.path }
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
