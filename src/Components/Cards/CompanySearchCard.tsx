import { Link } from 'react-router-dom';


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
        <div className='bg-lilac rounded-md mx-auto text-justify pt-2 text-8x1 drop-shadow-lg px-5 md:mr-5 flex flex-col md:flex-row items-center justify-between'>
            <div className='flex xl:w-32 xl:h-32 lg:w-28 lg:h-28 w-24 h-24 border-4 rounded-full items-center justify-center'>
                <i className={`${ card.icon } xl:text-7x1 lg:text-6x1 text-5xl`}></i>
            </div>
            <div className='xl:w-8/12 md:w-7/12 w-full text-black pl-5 md:my-8 my-3 mr-4'>
                <h1 className='text-md lg:text-2xl font-bold'>{ card.name }</h1>
                <p className='text-md lg:text-xl'>{ card.profission }</p>
                <p className='text-sm lg:text-lg'>{ card.description }</p>
            
            </div>
            
            <div className='flex xl:w-2/12 md:w-3/12 w-9/12 lg:h-48 h-16 pb-5 items-center justify-center'>
            <Link to={ card.path } className='text-center xl:text-lg lg:text-md text-sm rounded-full text-white py-2 px-10 bg-bright-purple drop-shadow-lg hover:bg-bold-purple'>{ card.text }</Link>
            </div>
        </div>
    );
}

export default CompanyTalentSearchCard;
