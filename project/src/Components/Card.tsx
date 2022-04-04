interface cardInterface {
    text: string;
}

const Card: React.FC<cardInterface> = ({ text }) => {
    return (
        <div className="bg-white rounded-md mx-auto p-4 max-w-sm drop-shadow-lg lg:text-lg">{ text }</div>
    );
}

export default Card;
