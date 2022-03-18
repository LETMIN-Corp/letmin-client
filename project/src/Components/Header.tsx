import { Link } from 'react-router-dom';
import logoImage from '../public/images/logo.svg'
import { useLocation } from "react-router-dom"

function Header() {
    const path = useLocation().pathname;

    return (
        <header className='fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg'>
            <div>
                <img src={ logoImage } style={{
                    width: '60px',
                }} />
            </div>
            <div className='md:flex md:items-center'>
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
