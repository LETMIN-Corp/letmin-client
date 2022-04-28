import { Link } from "react-router-dom";

interface CardInterface {
    card : {
        image: string,
        title: string,
        text: string,
        to: string,
    },
}

const CardRegister: React.FC<CardInterface> = ({ card }) => {
    return (
        <div className="flex flex-col items-center w-full lg:w-10/12 bg-lilac rounded-md mx-auto text-justify py-10 drop-shadow-lg lg:text-lg">
            <img src={ card.image } className="w-36" />
            <div className="text-dark-purple text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8">{ card.title }</div>
            <Link to={ card.to } className="text-center rounded-full text-xl text-white font-bold py-2 px-10 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">{ card.text }</Link>
        </div>
    );
}

export default CardRegister;
