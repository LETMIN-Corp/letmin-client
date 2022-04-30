import SecondaryLink from '../Links/SecondaryLink';

interface ComponentInterface {
    card : {
        image: string,
        title: string,
        text: string,
        path: string,
    },
}

const RegisterCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='flex flex-col items-center w-full lg:w-10/12 bg-lilac rounded-md mx-auto text-justify py-10 drop-shadow-lg lg:text-lg'>
            <img src={ card.image } className='w-36' />
            <div className='text-dark-purple text-center mb-2 font-bold text-lg lg:text-xl mt-8 mb-8'>{ card.title }</div>
            
            <SecondaryLink text={ card.text } path={ card.path } />
        </div>
    );
}

export default RegisterCard;
