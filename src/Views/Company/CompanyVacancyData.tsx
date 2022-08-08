import CompanyDefault from './CompanyDefault';
import CandidateData from '../../Components/Items/CandidateData';
import { useEffect } from 'react';

const CompanyVacancyData = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Dados da Vaga';
    }, []);

    let lista = ([
        {
            name: 'Candidato 1',
            compatibility: 15,
            curriculum: '/link',
        },
        {
            name: 'Candidato 2',
            compatibility: 15,
            curriculum: '/link',
        },
        {
            name: 'Candidato 3',
            compatibility: 15,
            curriculum: '/link',
        },
        {
            name: 'Candidato 4',
            compatibility: 15,
            curriculum: '/link',
        },
        {
            name: 'Candidato 5',
            compatibility: 15,
            curriculum: '/link',
        },
    ]);

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-chart-line mr-2"></i>
                    <span>Vaga 1</span>
                </h1>
                {/* <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                    <div className='bg-primary w-full h-52 rounded-sm'></div>
                </div> */}

                <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                    <div className='flex md:text-xl lg:text-2xl text-lg font-medium'> {/* Cabeçalho */}
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
                    <div> {/* Corpo */}
                        {/* <VacancyData name='Técnico de Informática' candidates={ 10 }/>
                        <VacancyData name='Supervisor' candidates={ 15 }/>
                        <VacancyData name='Gerente' candidates={ 8 }/>
                        <VacancyData name='Mecânico' candidates={ 45 }/>
                        <VacancyData name='Supervisor' candidates={ 15 }/>
                        <VacancyData name='Gerente' candidates={ 8 }/>
                        <VacancyData name='Mecânico' candidates={ 45 }/>
                        <VacancyData name='Supervisor' candidates={ 15 }/>
                        <VacancyData name='Gerente' candidates={ 8 }/>
                        <VacancyData name='Mecânico' candidates={ 45 }/> */}

                        {
                            lista.length === 0 && (
                                <div className='mt-5 text-center md:text-left text-dark-purple text-lg font-medium'>Nenhuma pasta encontrada</div>
                            )
                        }
                        {
                            lista.map((row, key) => <CandidateData key={ key } name={ row.name } compatibility={ row.compatibility } curriculum={ row.curriculum } />)
                        }

                    </div>
                </div>

            </div>
        </CompanyDefault>
    );
}

export default CompanyVacancyData;
