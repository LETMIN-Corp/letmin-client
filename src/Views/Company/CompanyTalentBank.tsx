import { faFolderOpen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import TalentBankCard from '../../Components/Cards/TalentBankCard';
import Loading from '../../Components/Items/Loading';
import useCompany from '../../Utils/useCompany';
import CompanyDefault from './CompanyDefault';

const CompanyTalentBank = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Banco de Talentos';
    }, []);

    const company = useCompany();
    const [allTalents, setAllTalents] = useState([]);
    const [filteredTalents, setFilteredTalents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        company.getTalentBank().then((res: any) => {
            setAllTalents(res.data.users);
            setFilteredTalents(res.data.users);
        });
    }, []);

    useEffect(() => {
        if (search.length === 0) {
            setFilteredTalents(allTalents);
            return;
        }

        const filteredTalents = allTalents.filter((talent: { name: string }) => {
            return talent.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredTalents(filteredTalents);
    }, [search]);

    return (
        <CompanyDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                    <span>Banco de Talentos</span>
                </h1>
                <div className="w-full flex items-center justify-between mt-5">
                    <div className="max-w-sm w-full relative mr-2">
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            type="text"
                            placeholder="Buscar"
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
                {company.loading ? (
                    <Loading />
                ) : (
                    <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {!filteredTalents.length && (
                            <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                                Nenhum talento encontrado
                            </div>
                        )}
                        {filteredTalents.map((user, key) => (
                            <TalentBankCard key={key} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </CompanyDefault>
    );
};

export default CompanyTalentBank;
