import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

interface ComponentInterface {
    text: string,
    path: string,
}

const MenuLink:React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <NavLink
            className='my-10 w-full block md:w-52 md:text-gray font-medium hover:text-primary md:hover:text-white ease-out duration-200'
            end to={ path }
        >
            { text }<span className='hidden float-right'><FontAwesomeIcon icon={ faChevronLeft }/></span>
        </NavLink>
    );
}

export default MenuLink;
