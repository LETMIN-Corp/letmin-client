import { useEffect } from 'react';
import TalentBankCard from '../../Components/Cards/TalentBankCard';
import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyTalentBank = () => {
    useEffect((): void => {
        window.document.title = 'Banco de Talentos';
    });

    return (
        <>
            <div className='flex'>
                <CompanyMenu />
                <div className='w-full mt-20 p-5'>
                    <h1 className='text-2xl'>Banco de Talentos</h1>
                    <div className='w-full flex items-center justify-between mt-5'>
                        <input type='text' placeholder='Buscar' className='max-w-sm w-full mr-3 px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <button className='bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                            <i className='fa-solid fa-plus'></i>
                        </button>
                    </div>
                    <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            [
                                {
                                    title: 'Pasta X',
                                },
                                {
                                    title: 'Pasta Y',
                                },
                                {
                                    title: 'Pasta Z',
                                },
                                {
                                    title: 'Pasta W',
                                },
                                {
                                    title: 'Pasta T',
                                },
                            ].map((card, key) => {
                                return (
                                    <TalentBankCard card={ card } key={ key } />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyTalentBank;
