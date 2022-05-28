import { useEffect } from 'react';
import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    return (
        <>
            <div className='flex'>
                <CompanyMenu />
                <div className='w-full mt-20'>

                </div>
            </div>
        </>
    );
}

export default CompanyPage;
