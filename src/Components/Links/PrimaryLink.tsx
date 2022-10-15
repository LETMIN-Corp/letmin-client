import { Link } from 'react-router-dom';

interface ComponentInterface {
    text: string;
    path: string;
    children: React.ReactNode;
}

const PrimaryLink: React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <Link
            className="block mx-auto rounded-md bg-white text-primary font-bold py-2 px-4 drop-shadow-lg border-2 border-primary hover:text-white hover:bg-primary ease-out duration-200"
            to={path}
        >
            {text}
        </Link>
    );
};

export default PrimaryLink;
