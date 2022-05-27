import Menu from '../../Components/Layouts/Menu';
import { useEffect } from 'react';

const CompanyIndicators = () => {
    useEffect((): void => {
        window.document.title = 'Indicadores';
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
                <div className='w-full mt-20 p-5'>
                    <h1 className='text-2xl'>Indicadores</h1>
                    <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                        <div className='bg-primary w-full h-52 rounded-sm'></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyIndicators;
