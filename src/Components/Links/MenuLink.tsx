import { Link } from 'react-router-dom';

interface ComponentInterface {
    text: string,
    path: string,
}

const MenuLink:React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <Link
            className='my-10 w-full block md:w-52 md:text-gray font-medium hover:text-primary md:hover:text-white ease-out duration-200'
            to={ path } 
        >
            { text }
        </Link>
    );
}

export default MenuLink;
