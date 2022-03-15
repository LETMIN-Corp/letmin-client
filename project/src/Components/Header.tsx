import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='flex justify-between px-4 md:px-10 py-5 bg-white'>
            <div>
                { /* Logo */ }
            </div>
            <div>
                <Link to='/' className='rounded-full text-white font-bold py-2 px-4 text-md bg-primary drop-shadow-lg border-2 border-primary hover:bg-white hover:text-primary ease-out duration-200'>Cadastre-se</Link>
            </div>
        </header>
    );
}

export default Header;
