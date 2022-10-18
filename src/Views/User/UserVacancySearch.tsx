import { faBullhorn, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import UserVacancySearchCard from '../../Components/Cards/UserVacancySearchCard';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

const UserVacancySearch = () => {
    const user = useUser();
    const { loading } = useLoading();

    interface VacancyInterface {
        _id: string;
        candidates: number;
        role: string;
        company: {
            _id: string;
            name: string;
        };
        user_applied: boolean;
        sector: string;
        region: string;
        description: string;
        curency: string;
        salary: number;
        views: number;
    }

    const [vacancies, setVacancies] = useState<VacancyInterface[]>([]);
    const [allVacancies, setAllVacancies] = useState<VacancyInterface[]>([]);
    const [searchVacancies, setSearchVacancies] = useState('');
    const [vacancyCards, setVacancyCards] = useState<VacancyInterface[]>([]);

    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';

        user.getVacancies().then((res: any) => {
            setAllVacancies(res.data.vacancies);
            setVacancies(res.data.vacancies);
        });
    }, []);

    useEffect(() => {
        const cards: any[] = vacancies.map((vacancy) => <UserVacancySearchCard vacancy={vacancy} key={vacancy._id} />);
        setVacancyCards(cards);
    }, [vacancies]);

    const filterVacancies = (value: string) => {
        if (value.length === 0) {
            setVacancies(allVacancies);
            return;
        }

        const filteredVacancies = allVacancies.filter((vacancy: { role: string }) => {
            return (
                vacancy.role.toLowerCase().includes(value.toLowerCase()) ||
                vacancy.role.toLowerCase().includes(value.toLowerCase())
            );
        });
        setVacancies(filteredVacancies);
    };

    useEffect((): void => {
        filterVacancies(searchVacancies);
    }, [searchVacancies]);

    return (
        <UserDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
                    <span>Buscar Vagas</span>
                </h1>
                <div className="mt-5 flex flex-wrap">
                    <div className="max-w-sm w-full relative">
                        <input
                            type="text"
                            placeholder="Buscar"
                            onChange={(e) => setSearchVacancies(e.target.value)}
                            className="w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md"
                            name="search"
                            id="search"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute right-2 top-2 text-xl text-dark-purple"
                        />
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {!!vacancyCards.length && (
                            <div className="mt-7">
                                <p className="text-bright-gray font-bold text-sm md:text-md text-md mb-2">
                                    {vacancyCards.length} resultados encontrados
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5">
                            {vacancyCards.length > 0 ? (
                                <List data={vacancyCards} itemsPerPage={10}></List>
                            ) : (
                                <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                                    Nenhum item encontrado
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </UserDefault>
    );
};

export default UserVacancySearch;
