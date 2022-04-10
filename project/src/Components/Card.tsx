interface CardInterface {
    card : {
        title: string,
        text: string,
    },
}

const Card: React.FC<CardInterface> = ({ card }) => {
    return (
        <div className="bg-white rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg">
            <div className="font-bold text-lg lg:text-xl">{ card.title }</div>
            <span>{ card.text }</span>
        </div>
    );
}

export default Card;
