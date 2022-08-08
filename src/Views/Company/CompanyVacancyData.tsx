import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';

const CompanyVacancyData = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Dados da Vaga';
    }, []);

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-chart-line mr-2"></i>
                    <span>Indicadores</span>
                </h1>
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
        </CompanyDefault>
    );
}

export default CompanyVacancyData;
