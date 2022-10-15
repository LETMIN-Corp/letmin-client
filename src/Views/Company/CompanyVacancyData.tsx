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
            setVacancyData(res.data.data.role);
        });
    }, []);

    return (
        <CompanyDefault>
            {loading ? (
                <Loading />
            ) : (
                <div className="p-5 min-h-90">
                    <h1 className="text-2xl">
                        <i className="fa-solid fa-briefcase mr-2"></i>
                        <span>Vaga: {vacancyData}</span>
                    </h1>
                    {candidates.length === 0 && (
                        <div className="h-96 w-full flex flex-col items-center justify-center">
                            <div>
                                <i className="fa-solid fa-user-slash text-8xl"></i>
                            </div>
                            <h1 className="text-xl font-bold text-center px-10 my-10 text-bright-purple">
                                Nenhum Candidato Encontrado
                            </h1>
                            <div>
                                <SecondaryLink
                                    path="/company/indicators"
                                    text="Voltar aos indicadores"
                                ></SecondaryLink>
                            </div>
                        </div>
                    )}
                    {candidates.length > 0 && (
                        <div className="bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg">
                            <div className="flex text-xl font-medium">
                                <div className="w-4/12 flex justify-center">
                                    Candidatos
                                </div>
                                <div className="w-4/12 flex justify-center">
                                    Compatibilidade
                                </div>
                                <div className="w-4/12 flex justify-center">Perfil</div>
                            </div>
                            <div>
                                {candidates.map((row: any, key: number) => (
                                    <CandidateData
                                        key={key}
                                        name={row.name}
                                        compatibility={75}
                                        curriculum={row._id}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </CompanyDefault>
    );
};

export default CompanyVacancyData;
