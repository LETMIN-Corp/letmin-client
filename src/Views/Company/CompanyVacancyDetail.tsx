import { faBuilding, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import MaskTypesEnum from '../../Enums/MaskTypesEnum';
import { formatErrors } from '../../Utils/ToastMessages';
import useAuth from '../../Utils/useAuth';
import useCompany from '../../Utils/useCompany';
import CompanyDefault from './CompanyDefault';

const CompanyVacancyDetail: React.FC = () => {
    const params = useParams();
    const company = useCompany();
    const auth = useAuth();
    const navigate = useNavigate();

    const id = params.id;

    if (id?.length !== 24) {
        navigate('/company/indicators');
    }

    const [canEdit, setCanEdit] = useState(false);

    function getDBVacancyData() {
        company.getCompanyVacancy(id!).then((res: any) => {
            if (!res.data.success) {
                company.dispatchError('Erro ao carregar dados');
                return navigate('/company');
            }
            setVacancyData(res.data.vacancy);
        });
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Vaga';
        getDBVacancyData();
    }, []);

    interface IVacancyData {
        [key: string]: any;
    }

    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        _id: '',
        role: '',
        sector: '',
        description: '',
        company: {
            company: {
                name: '',
            },
        },
        salary: '',
        currency: '',
        workload: '',
        type: '',
        region: '',
        vacancyType: '',
    });

    function setInputValue(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ): void {
        setVacancyData({
            ...vacancyData,
            [e.target.name]: e.target.value,
        });
    }

    const consultPackage = {
        getValue: (key: string) => {
            return vacancyData[key];
        },
        setValue: setInputValue,
    };

    function updateVacancyData() {
        company.updateVacancy(vacancyData).then((res: any) => {
            if (res.data.success) {
                company.dispatchSuccess(res.data.message);
                getDBVacancyData();
            } else {
                company.dispatchError(formatErrors(res.data.message));
            }
        });
    }

    return (
        <CompanyDefault>
            <div className="p-5 min-h-screen">
                {auth.loading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="mt-5">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faBuilding} className="text-8xl" />
                                <div className="w-full">
                                    <span className="flex justify-between">
                                        <h1 className="text-2xl ml-5 font-bold text-primary">
                                            {vacancyData.role}
                                        </h1>
                                        <FontAwesomeIcon
                                            onClick={() => setCanEdit(!canEdit)}
                                            className="cursor-pointer h-8 text-primary mr-4"
                                            icon={faGear}
                                        />
                                    </span>
                                    <p className="text-xl ml-5 w-full font-medium text-dark-purple">
                                        {vacancyData.company.company.name}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5">
                                <h2 className="text-xl mb-5 font-medium text-dark-purple">
                                    Informações sobre a Vaga
                                </h2>
                                <div className="md:flex md:justify-between">
                                    <div className="md:w-6/12 w-full mr-5">
                                        <TextInput
                                            placeholder="Setor"
                                            type="text"
                                            consultPackage={consultPackage}
                                            name="sector"
                                            id="sector"
                                            disabled={!canEdit}
                                        />
                                        <TextAreaInput
                                            name="description"
                                            id="description"
                                            row={7}
                                            consultPackage={consultPackage}
                                            placeholder="Descrição"
                                            value={vacancyData.description}
                                            disabled={!canEdit}
                                        />
                                    </div>
                                    <div className="md:w-6/12 w-full">
                                        <TextInput
                                            placeholder="Região"
                                            type="text"
                                            name="region"
                                            id="region"
                                            consultPackage={consultPackage}
                                            disabled={!canEdit}
                                        />
                                        <div className="md:flex justify-between">
                                            <TextInput
                                                placeholder="Moeda"
                                                type="text"
                                                size="medium"
                                                name="currency"
                                                id="currency"
                                                consultPackage={consultPackage}
                                                disabled={!canEdit}
                                            />
                                            <TextInput
                                                placeholder="Salário"
                                                useMask={MaskTypesEnum.money}
                                                limit={12}
                                                type="text"
                                                size="large"
                                                name="salary"
                                                id="salary"
                                                consultPackage={consultPackage}
                                                disabled={!canEdit}
                                            />
                                        </div>
                                        <TextInput
                                            placeholder="Carga Horária"
                                            type="text"
                                            consultPackage={consultPackage}
                                            name="workload"
                                            id="workload"
                                            disabled={!canEdit}
                                        />
                                        <TextInput
                                            placeholder="Tipo de Contratação"
                                            type="text"
                                            consultPackage={consultPackage}
                                            name="type"
                                            id="type"
                                            disabled={!canEdit}
                                        />
                                    </div>
                                    {
                                        canEdit && (
                                            <div className='flex justify-between md:justify-end w-full'>
                                                <button onClick={ getDBVacancyData } className='bg-gray text-black w-2/12 min-w-sm py-2 rounded-md'>Cancelar</button>
                                                <button onClick={ updateVacancyData } className='bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2'>Salvar</button>
                                            </div>
                                        )
                                    }
                                </div>
                                {canEdit && (
                                    <>
                                        <div className="flex justify-end w-full">
                                            <button
                                                onClick={getDBVacancyData}
                                                className="bg-gray text-black w-2/12 min-w-sm py-2 rounded-md"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={updateVacancyData}
                                                className="bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2"
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CompanyDefault>
    );
};

export default CompanyVacancyDetail;
