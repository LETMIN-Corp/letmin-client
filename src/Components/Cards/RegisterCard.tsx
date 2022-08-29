const RegisterCard: React.FC = ({ children }) => {
    return (
        <div className='flex flex-col h-full items-center w-full lg:w-10/12 bg-lilac rounded-md mx-auto text-justify lg:px-5 py-10 drop-shadow-lg lg:text-lg'>
            { children }
        </div>
    );
}

export default RegisterCard;
