interface ComponentInterface {
    text: string;
    handleClick: () => void;
    isDisabled?: boolean;
}

const SecondaryButton: React.FC<ComponentInterface> = ({ text, handleClick, isDisabled }) => {
    return (
        <button
            disabled={isDisabled}
            onClick={handleClick}
            className="text-center rounded-md text-white font-bold py-2 px-10 bg-bright-purple drop-shadow-lg hover:bg-bold-purple ease-out duration-200"
        >
            {text}
        </button>
    );
};

export default SecondaryButton;
