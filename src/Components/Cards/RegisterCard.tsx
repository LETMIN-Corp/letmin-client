import SecondaryLink from '../Links/SecondaryLink';

interface ComponentInterface {
    card : {
        icon: string,
        title: string,
        text: string,
        path: string,
    },
}

const RegisterCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='flex flex-col items-center w-full lg:w-10/12 bg-lilac rounded-md mx-auto text-justify py-10 drop-shadow-lg lg:text-lg'>
            <div className=' w-48 h-48 border-4 rounded-full flex items-center justify-center'>
                <i className={`${ card.icon } text-9xl`}></i>
            </div>
            <div className='text-dark-purple text-center mb-5 font-bold text-lg lg:text-xl mt-8 mb-8'>{ card.title }</div>
            
            <SecondaryLink text={ card.text } path={ card.path } />
        </div>
    );
}

export default RegisterCard;
