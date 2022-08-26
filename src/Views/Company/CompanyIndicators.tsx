import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const CompanyIndicators = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';
    }, []);

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faChartLine } className='mr-2' />
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

export default CompanyIndicators;
