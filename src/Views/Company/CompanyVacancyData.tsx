import { faBriefcase, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CandidateData from '../../Components/Items/CandidateData';
import Loading from '../../Components/Items/Loading';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import CompanyDefault from './CompanyDefault';

const CompanyVacancyData = () => {
    const company = useCompany();
    const { loading } = useLoading();

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    interface ICandidates {
        [key: string]: any;
    }

    const [candidates, setCandidates] = useState<ICandidates>([]);
    const [matches, setMatches] = useState<ICandidates>([]);
    const [vacancyData, setVacancyData] = useState('');

    useEffect((): void => {
        window.document.title = 'Letmin - Dados da Vaga';

        if (id?.length !== 24) {
            return navigate('/company/indicators');
        }

        company.getAllVacancyCandidates(id).then((res: any) => {
            if (!res.data.success) {
                company.dispatchError(res.data.message);
                return navigate('/company/indicators');
            }
            setCandidates(res.data.data.candidates);
            setMatches(res.data.data.matches);
            setVacancyData(res.data.data.role);
        });
    }, []);

    return (
        <CompanyDefault>
            {loading ? (
                <Loading />
            ) : (
                <div className="p-5 min-h-90">
                    <h1 className="text-2xl text-dark-purple font-medium">
                        <FontAwesomeIcon icon={ faBriefcase } className='mr-2' />
                        <span>Vaga: {vacancyData}</span>
                    </h1>
                    {
                        candidates.length > 0 && (
                            <div className="bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg">
                                <div className="flex text-xl font-medium">
                                    <div className="w-4/12 flex justify-center">Candidatos</div>
                                    <div className="w-4/12 flex justify-center">Compatibilidade</div>
                                    <div className="w-4/12 flex justify-center">Perfil</div>
                                </div>
                                <div>
                                    {candidates.map((row: any, key: number) => (
                                        <CandidateData key={key} name={row.name} compatibility={row.compatibility} curriculum={row._id} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    {
                        matches.length > 0 && (
                            <div className="bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg">
                                <div className="flex text-xl font-medium">
                                    <div className="w-4/12 flex justify-center">Sugestões</div>
                                    <div className="w-4/12 flex justify-center">Compatibilidade</div>
                                    <div className="w-4/12 flex justify-center">Perfil</div>
                                </div>
                                <div>
                                    {matches.map((row: any, key: number) => (
                                        <CandidateData key={key} name={row.name} compatibility={row.compatibility} curriculum={row._id} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    {
                        candidates.length <= 0 &&  matches.length <= 0 && (
                            <div className="px-5 h-80 flex flex-col items-center drop-shadow-md justify-center text-primary font-bold text-2xl">
                                <FontAwesomeIcon icon={faWarning} className="mr-2 text-5xl" />
                                <span className="text-center w-10/12 md:w-6/12 lg:w-4/12 mt-1">
                                    Não há candidatos ou sugestões para essa vaga
                                </span>
                            </div>
                        )
                    }
                </div>
            )}
        </CompanyDefault>
    );
};

export default CompanyVacancyData;
