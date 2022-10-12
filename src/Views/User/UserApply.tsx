import UserDefault from './UserDefault';
import ApplyData from '../../Components/Items/ApplyData';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import useUser from '../../Utils/useUser';
import useAuth from '../../Utils/useAuth';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../Components/Items/Loading';
import useLoading from '../../Utils/useLoading';

const UserApply = () => {
    const auth = useAuth();
    const user = useUser();
    const { loading } = useLoading();

    const [vacancies, setVacancies] = useState([]);

    useEffect((): void => {
        window.document.title = 'Letmin - Candidaturas';
        user.getCandidateVacancies().then((res : any) => {
            if (res.data.success) setVacancies(res.data.vacancies);
        })
    }, []);

    return (
        <UserDefault>
            <div className="p-5 min-h-90">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faHandshake } className='mr-2' />
                    <span>Candidaturas</span>
                </h1>
                        
                {
                    loading ? <Loading />
                    : (
                        <>    
                        {
                            vacancies.length === 0 ? (
                                <div className='mt-5 text-center md:text-left text-dark-purple text-lg font-medium'>Nenhuma candidatura encontrada</div>
                            ) : (
                                <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                                    <div className='flex text-xl font-medium'>
                                        <div className='w-4/12 flex justify-center text-center'>
                                            Vaga
                                        </div>
                                        <div className='w-4/12 flex justify-center'>
                                            Empresa
                                        </div>
                                        <div className='w-4/12 flex justify-center'>
                                            Detalhes
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            vacancies.map((vacancy, key) => <ApplyData user_id={  auth.userData.user_id } vacancy={ vacancy } key={ key }/>)
                                        }
                                    </div>
                                </div>
                            )
                        }    
                        </>
                    )
                }
            </div>
        </UserDefault>
    );
}

export default UserApply;
