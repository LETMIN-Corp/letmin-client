import SecondaryLink from '../Links/SecondaryLink';


interface ComponentInterface {
    card : {
        icon: string,
        name: string,
        profission: string,
        description: string,
        text: string,
        path: string,
    },
}

const CompanyTalentSearchCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='bg-lilac rounded-md mx-auto text-justify text-8x1 drop-shadow-lg px-5 mr-5 flex items-center justify-between'>
            <div className='flex w-40 h-40 border-4 rounded-full items-center justify-center'>
                <i className={`${ card.icon } text-8xl`}></i>
            </div>
            <div className='w-8/12 text-black pl-5 my-8 mr-4'>
                <h1 className='text-xl lg:text-3xl font-bold'>{ card.name }</h1>
                <p className='text-lg lg:text-xl'>{ card.profission }</p>
                <p className='text-lg lg:text-lg'>{ card.description }</p>
            
            </div>
            
            <div className='flex w-2/12 h-48 items-center justify-center'>
                <SecondaryLink text={ card.text } path={ card.path } />
            </div>
        </div>
    );
}

export default CompanyTalentSearchCard;
