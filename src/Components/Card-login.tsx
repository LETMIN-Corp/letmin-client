import clientImage from "../public/images/circle-user.png"
import companyImage from "../public/images/circle-company.png"
import { Link } from "react-router-dom";

interface CardInterface {
    card : {
        image: string,
        title: string,
    },
}

const Card: React.FC<CardInterface> = ({ card }) => {
    if (card.image == 'clientImage')
    {
        return (
            <div className="bg-lilac rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg ">
                <div className="items-center px-4 md:px-10 py-2">
                    <img src={ clientImage } className="md:w-36" />
                </div>
                <div className="text-dark-purple text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8">{ card.title }</div>
                <Link to="/" className="ml-14 rounded-full text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">Linkedin</Link>
            </div>
        );
    }
    else 
    {
        return (
            <div className="bg-lilac rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg">
                <div className="items-center px-4 md:px-10 py-2">
                    <img src={ companyImage } className="md:w-36" />
                </div>
                <div className="text-dark-purple text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8">{ card.title }</div>
                <Link to="/" className="ml-16 rounded-full text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">Acessar</Link>
            </div>
        );
    }
}
/*'light-purple': '#BE7EEE',
      'bold-purple': '#55396B',
      'bright-purple': '#7A2AB8',
      'lively-purple': '#8800EA', */

export default Card;
