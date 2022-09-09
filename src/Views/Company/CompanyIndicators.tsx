import CompanyDefault from './CompanyDefault';
import VacancyData from '../../Components/Items/VacancyActions';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';

const CompanyIndicators = () => {
    const Company = useCompany();

    const getCompanyData = Company.getAllVacancies(Company.userData.user_id);

    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';

        if (getCompanyData) {
            console.log('getCompanyData', getCompanyData);
        }

        //console.log('vacancies', data);
    }, []);

    interface VacancyData {
        [key: string]: string;
    }

    const data = [
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
    ];

    return (
        <CompanyDefault>
            <div className="p-5 min-h-90">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faChartLine } className='mr-2' />
                    <span>Indicadores</span>
                </h1>
                {
                    data.length > 0 && (
                        <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                            <div className='flex text-xl font-medium'>
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
                                    data.map((row, key) => <VacancyData key={ key } name={ row.name } candidates={ row.candidate } />)
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
