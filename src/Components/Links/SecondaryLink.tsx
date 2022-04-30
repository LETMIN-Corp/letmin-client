import { Link } from "react-router-dom";

interface ComponentInterface {
    text: string,
    path: string,
}

const SecondaryLink : React.FC<ComponentInterface> = ({ text, path }) => {
    return (
        <Link to={ path } className="text-center rounded-full text-xl text-white font-bold py-2 px-10 bg-bright-purple drop-shadow-lg md:text-lg hover:bg-bold-purple ease-out duration-200">{ text }</Link>
    );
}

export default SecondaryLink;
