import CompanyDefault from './CompanyDefault';
import VacancyData from '../../Components/Items/VacancyActions';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';

const CompanyIndicators = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';
    }, []);

    let lista = ([
        {
            name: 'Gerente',
            candidate: 8,
         }, // [0][0] [0][1]
        {
            name: 'Mecânico',
            candidate: 45,
        }, // [1][0] [1][1]
        {
            name: 'Supervisor',
            candidate: 15,
        },
        {
            name: 'Técnico em Informática',
            candidate: 15,
        },
        {
            name: 'Técnico em Eletrônica',
            candidate: 56,
        },
        {
            name: 'Gerente',
            candidate: 8,
        },
        {
            name: 'Mecânico',
            candidate: 45,
        },
        {
            name: 'Supervisor',
            candidate: 15,
        },
        {
            name: 'Técnico em Informática',
            candidate: 15,
        },
        {
            name: 'Técnico em Eletrônica',
            candidate: 56,
        },
    ]);

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-chart-line mr-2"></i>
                    <span>Indicadores</span>
                </h1>
                {
                    lista[0].name != "" && (
                        <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                            <div className='flex md:text-xl lg:text-2xl text-lg font-medium'>
                                <div className='w-4/12 flex justify-center'>
                                    Vagas
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Candidatos
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Ações
                                </div>
                            </div>
                            <div>
                                {
                                    lista.map((row, key) => <VacancyData key={ key } name={ row.name } candidates={ row.candidate } />)
                                }

                            </div>
                        </div>
                    )
                }

                        

            </div>
        </CompanyDefault>
    );
}

export default CompanyIndicators;
