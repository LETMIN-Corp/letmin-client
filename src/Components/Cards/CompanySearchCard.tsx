import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ComponentInterface {
    user : {
        _id: number | string,
        name: string,
        picture: string,
    },
}

const CompanyTalentSearchCard: React.FC<ComponentInterface> = ({ user }) => {
    return (
        <div className='w-full bg-lilac rounded-md mx-auto text-justify pt-2 text-8x1 drop-shadow-lg px-5 md:mr-5 flex flex-col md:flex-row items-center justify-between'>
            <div className='flex xl:w-32 xl:h-32 lg:w-28 lg:h-28 w-24 h-24 rounded-full items-center justify-center'>
                {/* <FontAwesomeIcon icon={ faUser } className='xl:text-7x1 lg:text-6x1 text-5xl' /> */}
                <img src={ user.picture } className='rounded-full border-4' />
            </div>
            <div className='xl:w-8/12 md:w-7/12 w-full text-black pl-5 md:my-8 my-3 mr-4'>
                <h1 className='text-md lg:text-2xl font-bold'>{ user.name }</h1>
                {/* <p className='text-md lg:text-xl'>{ user.profission }</p>
                <p className='text-sm lg:text-lg'>{ user.description }</p> */}
            
            </div>
            
            <div className='flex xl:w-2/12 md:w-3/12 w-9/12 lg:h-48 h-16 pb-5 items-center justify-center'>
            <Link to={ '/company/combinations/' + user._id } className='text-center xl:text-lg lg:text-md text-sm rounded-md text-white py-2 px-10 bg-bright-purple drop-shadow-lg hover:bg-bold-purple'>Ver Perfil</Link>
            </div>
        </div>
    );
}

export default CompanyTalentSearchCard;
