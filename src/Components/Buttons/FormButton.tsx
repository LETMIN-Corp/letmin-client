interface ComponentInterface {
    text: string,
    handleClick?: () => void,
    isDisabled?: boolean,
    isFullWidth?: boolean, 
}

const FormButton : React.FC<ComponentInterface> = ({ text, handleClick, isDisabled, isFullWidth }) => {
    return (
        <button disabled={ isDisabled } onClick={ handleClick } className={`${[isDisabled ? 'bg-bold-purple' : '']} bg-bright-purple text-white text-center ${[isFullWidth ? 'w-full' : 'w-32' ]} py-2 rounded-md drop-shadow-lg md:text-lg hover:bg-bold-purple ease-out duration-200`}>
            { text }
        </button>
    );
}

export default FormButton;
