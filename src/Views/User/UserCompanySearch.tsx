import { faBuildingUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import UserCompanySearchCard from '../../Components/Cards/UserCompanySearchCard';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import { Company, ICompanie } from '../../Interfaces/CompanyInterfaces';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

const UserCompanySearch = () => {
    const user = useUser();
    const { loading } = useLoading();

    const [allCompanies, setAllCompanies] = useState<Company[]>([new Company()]);
    const [companies, setCompanies] = useState<Company[]>([new Company()]);
    const [searchCompanies, setSearchCompanies] = useState<string>('');
    const [companyCards, setCompanyCards] = useState([]);

    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';

        user.getCompanies().then((res: any) => {
            setAllCompanies(res.data.companies);
            setCompanies(res.data.companies);
        });
    }, []);

    useEffect(() => {
        const cards: any = companies.map((company: Company) => <UserCompanySearchCard company={company} key={company._id} />);
        setCompanyCards(cards);
    }, [companies]);

    const filterCompanies = (value: string) => {
        if (value.length === 0) {
            setCompanies(allCompanies);
            return;
        }

        const filteredCompanies = allCompanies.filter((company: Company) => {
            return (
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.address.toLowerCase().includes(value.toLowerCase())
            );
        });
        setCompanies(filteredCompanies);
    };

    useEffect((): void => {
        filterCompanies(searchCompanies);
    }, [searchCompanies]);

    return (
        <UserDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faBuildingUser} className="mr-2" />
                    <span>Buscar Empresas</span>
                </h1>
                <div className="mt-5 flex flex-wrap">
                    <div className="max-w-sm w-full relative">
                        <input
                            type="text"
                            placeholder="Buscar"
                            onChange={(e) => setSearchCompanies(e.target.value)}
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
                        {!!companyCards.length && (
                            <div className="mt-7">
                                <p className="text-bright-gray font-bold text-sm md:text-md text-md mb-2">
                                    {companyCards.length} resultados encontrados
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5">
                            {!!companyCards.length && <List data={companyCards} itemsPerPage={10}></List>}
                            {!companyCards.length && (
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

export default UserCompanySearch;
