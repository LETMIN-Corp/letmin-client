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
        <div className='lg:w-11/12 bg-lilac rounded-md mx-auto text-justify py-10 text-8x1  drop-shadow-lg px-5'>
            <div className='flex flex-col w-48 float-left h-48 border-4 rounded-full items-center justify-center'>
                <i className={`${ card.icon } text-8xl`}></i>
            </div>
            <div className='flex flex-col float-left w-8/12 text-black  mb-5 pl-5 mt-8 mb-8'>
                <h1 className='text-xl lg:text-3xl font-bold'>{ card.name }</h1>
                <p className='text-lg lg:text-xl'>{ card.profission }</p>
                <p className='text-lg lg:text-lg'>{ card.description }</p>
            
            </div>
            
            <div className='flex flex-col float-right w-2/12 h-48 items-center justify-center'>
                <SecondaryLink text={ card.text } path={ card.path } />
            </div>
        </div>
    );
}

export default CompanyTalentSearchCard;
