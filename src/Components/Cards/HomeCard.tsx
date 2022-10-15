interface ComponentInterface {
    card: {
        title: string;
        text: string;
    };
}

const HomeCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className="bg-white rounded-md mx-auto text-justify p-5 max-w-sm drop-shadow-lg lg:text-lg">
            <div className="text-primary text-center mb-2 font-bold text-lg lg:text-xl">
                {card.title}
            </div>
            <span>{card.text}</span>
        </div>
    );
};

export default HomeCard;
