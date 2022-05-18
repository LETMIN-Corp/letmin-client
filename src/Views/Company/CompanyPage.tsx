import Menu from '../../Components/Layouts/Menu';
import { useEffect } from 'react';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    const menuButtons = [
        {
            text: 'Indicadores',
            path: '/company/1',
            isLink: true,
        },
        {
            text: 'Banco de Talentos',
            path: '/company/2',
            isLink: true,
        },
        {
            text: 'Combinações',
            path: '/company/3',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/4',
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

                </div>
            </div>
        </>
    );
}

export default CompanyPage;
