import { faLightbulb, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import CompanyDefault from './CompanyDefault';

const CompanyTalentSearch = () => {
    const company = useCompany();
    const { loading } = useLoading();

    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Talentos';

        company.getUsers().then((res: any) => {
            setAllUsers(res.data.users);
            setUsers(res.data.users);
        });
    }, []);

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [searchUsers, setSearchUsers] = useState<string>('');
    const [userCards, setUserCards] = useState([]);

    useEffect(() => {
        const cards = users.map((user) => (
            <CompanyTalentSearchCard user={user} key={user._id} />
        ));
        // @ts-ignore:next-line
        setUserCards(cards);
    }, [users]);

    const filterUsers = (value: string) => {
        if (value.length === 0) {
            setUsers(allUsers);
            return;
        }

        const filteredUsers = allUsers.filter((user: { name: string }) => {
            return user.name.toLowerCase().includes(value.toLowerCase());
        });
        setUsers(filteredUsers);
    };

    useEffect((): void => {
        filterUsers(searchUsers);
    }, [searchUsers]);

    return (
        <CompanyDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                    <span> Buscar Talentos</span>
                </h1>

                <div className="mt-5">
                    <div className="max-w-sm w-full relative">
                        <input
                            type="text"
                            placeholder="Buscar"
                            onChange={(e) => setSearchUsers(e.target.value)}
                            className="w-full mr-3 pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md"
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
                        {!!userCards.length && (
                            <div className="mt-7">
                                <p className="text-bright-gray font-bold text-sm md:text-md text-md mb-2">
                                    {userCards.length} resultados encontrados
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5">
                            {userCards.length > 0 ? (
                                <List data={userCards} itemsPerPage={10}></List>
                            ) : (
                                <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                                    Nenhum item encontrado
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </CompanyDefault>
    );
};

export default CompanyTalentSearch;
