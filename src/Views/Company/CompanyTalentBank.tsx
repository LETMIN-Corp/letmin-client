import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';
import TalentBankCard from '../../Components/Cards/TalentBankCard';

const CompanyTalentBank = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Banco de Talentos';
    }, []);

    const company = useCompany();
    const [allTalents, setAllTalents] = useState([]);

    useEffect(() => {
        company.getTalentBank().then((res : any) => {
            setAllTalents(res.data.users);
        });
    }, []);

    return (
        <CompanyDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faFolderOpen } className='mr-2' />
                    <span>Banco de Talentos</span>
                </h1>
                <div className='w-full flex items-center justify-between mt-5'>
                    <div className='max-w-sm w-full relative mr-2'>
                        <input onChange={ (e) => {} } type='text' placeholder='Buscar' className='w-full mr-3 pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                    </div>
                </div>
                <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {
                        allTalents.map((user, key) => <TalentBankCard key={ key } user={ user } />)
                    }
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyTalentBank;
