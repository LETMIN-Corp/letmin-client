import CompanyDefault from './CompanyDefault';
import CandidateData from '../../Components/Items/CandidateData';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';

const CompanyVacancyData = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Dados da Vaga';
    }, []);

    let lista = ([
        {
            name: 'Candidato 1',
            compatibility: 0,
            curriculum: '',
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
                    <i className="fa-solid fa-briefcase mr-2"></i>
                    <span>Vaga 1</span>
                </h1>

                    {
                        lista[0].name === ""  && (
                        <div className='h-96 w-full flex flex-col items-center justify-center'>
                            <div>
                                <i className="fa-solid fa-user-slash text-8xl"></i>
                            </div>
                            <h1 className='text-xl font-bold text-center px-10 my-10 text-bright-purple'>Nenhum Candidato Encontrado</h1>
                            <div>
                                <SecondaryLink path='/company/indicators' text='Voltar aos indicadores'></SecondaryLink>
                            </div>
                        </div>
                        )
                    }
                     {
                        lista[0].name != ""  && (
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
                                <div>
                                    {

                                        lista.map((row, key) => <CandidateData key={ key } name={ row.name } compatibility={ row.compatibility } curriculum={ row.curriculum } />)
                                    }

                                </div>
                            </div>

                            
                        )
                    }

            </div>
        </CompanyDefault>
    );
}

export default CompanyVacancyData;
