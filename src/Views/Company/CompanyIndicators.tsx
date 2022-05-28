import { useEffect } from 'react';
import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyIndicators = () => {
    useEffect((): void => {
        window.document.title = 'Indicadores';
    });

    return (
        <>
            <div className='flex'>
                <CompanyMenu />
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
