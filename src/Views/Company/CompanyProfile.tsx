import { useEffect } from 'react';
import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyProfile = () => {
    useEffect((): void => {
        window.document.title = 'Meus Dados';
    });

    return (
        <>
            <div className='flex'>
                <CompanyMenu />
                <div className='w-full mt-20 p-5'>
                    <h1 className='text-2xl'>Meus Dados</h1>
                    <div className=''>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyProfile;
