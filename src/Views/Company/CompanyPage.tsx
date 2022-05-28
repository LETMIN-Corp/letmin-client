import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    return (
        <CompanyDefault>
            
        </CompanyDefault>
    );
}

export default CompanyPage;
