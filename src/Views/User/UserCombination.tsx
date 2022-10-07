import UserDefault from './UserDefault';
import CombinationData from '../../Components/Items/CombinationsData';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import useUser from '../../Utils/useUser';
// import UserDefault from './UserDefault'
import UserVacancySearchCard from '../../Components/Cards/UserVacancySearchCard';
import useAuth from '../../Utils/useAuth';

const UserCombination = () => {
    const auth = useAuth();
    const user = useUser();
    // const [allVacancies, setAllVacancies] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [searchVacancies, setSearchVacancies] = useState('');

    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
        user.getVacancies().then((res : any) => {
            // setAllVacancies(res.data.vacancies);
            setVacancies(res.data.vacancies);
        })
    }, []);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <UserDefault>
            <div className="p-5 min-h-90">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faHandshake } className='mr-2' />
                    <span>Combinações</span>
                </h1>
                {
                    (vacancies) && (
                        <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                            <div className='flex text-xl font-medium'>
                                <div className='w-4/12 flex justify-center'>
                                    Empresas
                                </div>
                                <div className='w-4/12 flex justify-center text-center'>
                                    Tipos de Vaga
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Ações
                                </div>
                            </div>
                            <div>
                                {
                                    vacancies.map((vacancy, key) => <CombinationData user_id={  auth.userData.user_id } vacancy={ vacancy } key={ key } handleClick={ () => setModalIsOpen(true) } />)
                                }
                            </div>
                        </div>
                    )
                }

                        

            </div>
        </UserDefault>
    );
}

export default UserCombination;
