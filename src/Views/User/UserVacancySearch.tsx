import { faBullhorn, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import UserVacancySearchCard from '../../Components/Cards/UserVacancySearchCard';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault'
import useAuth from '../../Utils/useAuth';

const UserVacancySearch = () => {
    const auth = useAuth();
    const user = useUser();
    const [allVacancies, setAllVacancies] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [searchVacancies, setSearchVacancies] = useState('');

    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';
    }, []);

    useEffect(() => {
        user.getVacancies().then((res : any) => {
            setAllVacancies(res.data.vacancies);
            setVacancies(res.data.vacancies)
        })
    }, []);

    const [vacancyCards, setVacancyCards] = useState([]);
    useEffect(() => {
        // @ts-ignore:next-line
        const cards = vacancies.map((vacancy) => <UserVacancySearchCard user_id={  auth.userData.user_id } vacancy={ vacancy } key={ vacancy._id } />);
        // @ts-ignore:next-line
        setVacancyCards(cards);
    }, [vacancies]);

    const filterVacancies = (value : string) => {
        if(value.length === 0) {
            setVacancies(allVacancies);
            return;
        }

        let filteredVacancies = allVacancies.filter((vacancy : { role : string }) => {
            return vacancy.role.toLowerCase().includes(value.toLowerCase());
        });
        setVacancies(filteredVacancies);
    }

    useEffect((): void => {
        filterVacancies(searchVacancies);
    }, [searchVacancies]);

    return (
        <UserDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faBullhorn } className='mr-2' />
                    <span>Buscar Vagas</span>
                </h1>
                <div className='mt-5 flex flex-wrap'>
                    <div className='max-w-sm w-full relative'>
                        <input type='text' placeholder='Buscar' onChange={ (e) => setSearchVacancies(e.target.value) } className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                    </div>
                </div>
                {
                    user.loading && (
                        <Loading />
                    )
                }
                {
                    !user.loading && (
                        <>      
                            {
                                !!vacancyCards.length && (
                                    <div className='mt-7'>
                                        <p className='text-bright-gray font-bold text-sm md:text-md text-md mb-2'>Foram encontrados { vacancyCards.length } resultados</p>
                                    </div>
                                )
                            }
                            <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5'>
                                {
                                    !!vacancyCards.length && (                                
                                        <List data={ vacancyCards } itemsPerPage={ 10 }></List>
                                    )
                                }
                                {
                                    !vacancyCards.length && (
                                        <div className='mt-5 text-center md:text-left text-dark-purple text-lg font-medium'>Nenhum item encontrado</div>
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </UserDefault>
    );
}

export default UserVacancySearch;
