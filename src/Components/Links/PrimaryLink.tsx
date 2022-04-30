import { Link } from 'react-router-dom';

interface ComponentInterface {
    text: string,
    path: string,
}

const PrimaryLink : React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <Link 
            className='rounded-full md:text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200'
            to={ path }        
        >
            { text }
        </Link>
    );
}

export default PrimaryLink;
