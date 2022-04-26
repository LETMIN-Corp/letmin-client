import clientImage from "../public/images/circle-user.png"
import companyImage from "../public/images/circle-company.png"
import { Link } from "react-router-dom";

interface CardInterface {
    card : {
        image: string,
        title: string,
        text: string,
    },
}

const Card: React.FC<CardInterface> = ({ card }) => {
    if (card.image == 'logoImage')
    {
        return (
            <div className="bg-white rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg">
                <div className="items-center px-4 md:px-10 py-2">
                    <img src={ clientImage } className="md:w-36" />
                </div>
                <div className="text-primary text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8">{ card.title }</div>
                <Link to="/" className="ml-16 rounded-full text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">Acessar</Link>
            </div>
        );
    }
    else 
    {
        return (
            <div className="bg-white rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg">
                <div className="items-center px-4 md:px-10 py-2">
                    <img src={ companyImage } className="md:w-36" />
                </div>
                <div className="text-primary text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8">{ card.title }</div>
                <Link to="/" className="ml-16 rounded-full text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">Acessar</Link>
            </div>
        );
    }
}

export default Card;
