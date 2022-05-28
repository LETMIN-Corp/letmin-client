import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';

const CompanyProfile = () => {
    useEffect((): void => {
        window.document.title = 'Meus Dados';
    });

    return (
        <CompanyDefault>
            <h1 className='text-2xl'>Meus Dados</h1>
            <div className=''>
                
            </div>
        </CompanyDefault>
    );
}

export default CompanyProfile;
