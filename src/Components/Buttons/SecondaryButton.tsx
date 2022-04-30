interface ComponentInterface {
    text: string,
    handleClick: () => any,
}

const SecondaryButton : React.FC<ComponentInterface> = ({ text, handleClick }) => {
    return (
        <button
            className="bg-bright-purple text-white text-center w-32 py-2 rounded-full drop-shadow-lg text-lg hover:bg-bold-purple ease-out duration-200"
            onClick={ handleClick }
        >
            { text }
        </button>
    );
}

export default SecondaryButton;
