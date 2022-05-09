interface ComponentInterface {
    text: string,
    handleClick: () => void,
}

const FormButton : React.FC<ComponentInterface> = ({ text, handleClick }) => {
    return (
        <button onClick={ handleClick } className='bg-bright-purple text-white text-center w-32 py-2 rounded-full drop-shadow-lg md:text-lg hover:bg-bold-purple ease-out duration-200'>
            { text }
        </button>
    );
}

export default FormButton;
