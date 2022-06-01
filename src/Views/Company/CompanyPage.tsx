import Menu from '../../Components/Layouts/Menu';
import { useEffect } from 'react';
import Statistic from './CompanyStatistics';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    const menuButtons = [
        {
            text: 'Indicadores',
            path: '/company/indicators',
            isLink: true,
        },
        {
            text: 'Banco de Talentos',
            path: '/company/bank',
            isLink: true,
        },
        {
            text: 'Combinações',
            path: '/company/3',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/statistics',
            isLink: true,
        },
        {
            text: 'Meus Dados',
            path: '/company/5',
            isLink: true,
        },
    ];

    return (
        <>
            <div className='flex'>
                <Menu menuButtons={ menuButtons } showMenu={ true } />
                <div className='w-full mt-20'>
                    <Statistic />
                </div>
            </div>
        </>
    );
}

export default CompanyPage;
