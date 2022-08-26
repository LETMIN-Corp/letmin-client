import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ComponentInterface {
    card : {
        name: string,
        function: string,
        location: string,
        description: string,
    },
}

const UserVacancySearchCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='w-full bg-lilac rounded-md mx-auto text-justify text-8x1 drop-shadow-lg px-5 pt-5 md:pt-0 md:mr-5 flex flex-col md:flex-row items-center justify-between'>
            <div className='flex xl:w-32 xl:h-32 lg:w-28 lg:h-28 w-24 h-24 border-4 rounded-full items-center justify-center'>
                <FontAwesomeIcon icon={ faBuilding } className='xl:text-7x1 lg:text-6x1 text-5xl' />
            </div>
            <div className='xl:w-8/12 md:w-7/12 w-full text-black pl-5 md:my-5 my-3 mr-4'>
                <h1 className='text-md lg:text-2xl font-bold'>{ card.name }</h1>
                <p className='text-md lg:text-xl'>{ card.function }</p>
                <p className='text-md lg:text-xl'>{ card.location }</p>
                <p className='text-sm lg:text-lg'>{ card.description }</p>
            
            </div>
            
            <div className='flex xl:w-2/12 md:w-3/12 w-9/12 pb-5 md:pb-0 items-center justify-center'>
                <Link to='/company/userprofile' className='text-center xl:text-lg lg:text-md text-sm rounded-full text-white py-2 px-10 bg-bright-purple drop-shadow-lg hover:bg-bold-purple'>Ver Perfil</Link>
            </div>
        </div>
    );
}

export default UserVacancySearchCard;
