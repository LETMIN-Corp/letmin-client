import Menu from '../../Components/Layouts/Menu';
import { useEffect } from 'react';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    return (
        <>
            <div className='flex'>
                <Menu showMenu={ true } />
                <div className='52 w-full mt-20'>

                </div>
            </div>
        </>
    );
}

export default CompanyPage;
