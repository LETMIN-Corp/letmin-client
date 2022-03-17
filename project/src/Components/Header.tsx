import { Link } from 'react-router-dom';
import logoImage from '../public/images/logo.svg'

function Header() {
    return (
        <header className='flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg'>
            <div>
                <img src={ logoImage } style={{
                    width: '60px',
                }} />
            </div>
            <div>
                <Link to='/' className='rounded-full text-white font-bold py-2 px-4 text-md bg-primary drop-shadow-lg border-2 border-primary hover:bg-white hover:text-primary ease-out duration-200'>Cadastre-se</Link>
            </div>
        </header>
    );
}

export default Header;
