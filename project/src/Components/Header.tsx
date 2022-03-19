import { Link } from 'react-router-dom';
import logoImage from '../public/images/logo.svg'
import { useLocation } from "react-router-dom"
import { useState } from 'react';

function Header() {
    const path = useLocation().pathname;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <header className='fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg'>
            <div>
                <img src={ logoImage } style={{
                    width: '60px',
                }} />
            </div>
            <div>
                <i onClick={ () => setMenuIsOpen(true) } className="fa-solid fa-bars text-2xl block md:hidden cursor-pointer"></i>
            </div>

            {
                menuIsOpen && (
                    <div className='w-screen min-h-screen bg-white fixed top-0 left-0'>
                        <div className='w-full flex items-center justify-between px-4 py-2'>
                            <img src={ logoImage } style={{
                                width: '60px',
                            }} />
                            <i onClick={ () => setMenuIsOpen(false) } className="fa-solid fa-circle-xmark text-3xl cursor-pointer"></i>
                        </div>

                        <div className='text-center mt-20'>
                            {
                                [
                                    {
                                        text: 'Diferencial',
                                        path: '#differential',
                                    },
                                    {
                                        text: 'Sobre',
                                        path: '#about',
                                    },
                                    {
                                        text: 'Quem somos',
                                        path: '#who-we-are',
                                    },
                                ].map((button, key) => {
                                    return (
                                        <a
                                            key={ key }
                                            className="block my-10 text-black hover:text-primary ease-out duration-200 text-lg"
                                            href={ button.path }
                                        >
                                            { button.text }
                                        </a>
                                    );
                                })
                            }

                            <Link to='/' className='rounded-full text-white font-bold py-2 px-4 text-md bg-primary drop-shadow-lg border-2 border-primary hover:bg-white hover:text-primary ease-out duration-200'>Cadastre-se</Link>
                        </div>
                    </div>
                )
            }

            <div className='hidden md:flex md:items-center'>
                {
                    (path === '/') && (
                        <div className='flex'>
                            {
                                [
                                    {
                                        text: 'Diferencial',
                                        path: '#differential',
                                    },
                                    {
                                        text: 'Sobre',
                                        path: '#about',
                                    },
                                    {
                                        text: 'Quem somos',
                                        path: '#who-we-are',
                                    },
                                ].map((button, key) => {
                                    return (
                                        <a
                                            key={ key }
                                            className="text-black mr-5 hover:text-primary ease-out duration-200"
                                            href={ button.path }
                                        >
                                            { button.text }
                                        </a>
                                    );
                                })
                            }
                        </div>
                    )
                        
                }   
                <Link to='/' className='rounded-full text-white font-bold py-2 px-4 text-md bg-primary drop-shadow-lg border-2 border-primary hover:bg-white hover:text-primary ease-out duration-200'>Cadastre-se</Link>
            </div>
        </header>
    );
}

export default Header;
