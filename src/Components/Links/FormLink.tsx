import { Link } from 'react-router-dom';

interface ComponentInterface {
    text: string;
    path: string;
}

const FormLink: React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <Link
            className="bg-bright-purple text-white text-center w-32 py-2 rounded-md drop-shadow-lg hover:bg-bold-purple ease-out duration-200"
            to={path}
        >
            {text}
        </Link>
    );
};

export default FormLink;
