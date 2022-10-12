import { faBuilding, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectInput from "../../Components/Inputs/SelectInput";
import TextAreaInput from "../../Components/Inputs/TextAreaInput";
import TextInput from "../../Components/Inputs/TextInput";
import Loading from "../../Components/Items/Loading";
import MaskTypesEnum from "../../Enums/MaskTypesEnum";
import { formatErrors } from "../../Utils/ToastMessages";
import useAuth from "../../Utils/useAuth";
import useCompany from "../../Utils/useCompany";
import CompanyDefault from "./CompanyDefault";

const CompanyVacancyDetail : React.FC = () => {
    const params = useParams();
    const company = useCompany();
    const auth = useAuth();
    const navigate = useNavigate();

    const id = params.id;

    if (id?.length !== 24) {
        navigate('/company/indicators');
    }

    const [canEdit, setCanEdit] = useState(false);

    function getDBVacancyData()
    {
        company.getCompanyVacancy(id!).then((res: any) => {
            if(!res.data.success) {
                company.dispatchError('Erro ao carregar dados');
                return navigate('/company');
            }
            setVacancyData(res.data.vacancy);
        })
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Vaga';
        getDBVacancyData();
    }, []);

    interface IVacancyData {
        [key: string]: any
    }

    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        _id: '',
        role: '',
        sector: '',
        description: '',
        company: {
            company: {
                name: '',
            }
        },
        salary: '',
        currency: '',
        workload: '',
        type: '',
        region: '',
        vacancyType: '',
    });

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        setVacancyData({
            ...vacancyData,
            [e.target.name]: e.target.value
        });
    }

    const consultPackage = {
        getValue: (key: string) => { return vacancyData[key]; },
        setValue: setInputValue, 
    }

    function updateVacancyData() {
        company.updateVacancy(vacancyData).then((res: any)=> {
            if(res.data.success) {
                company.dispatchSuccess(res.data.message);
                getDBVacancyData();
            } else {
                company.dispatchError(formatErrors(res.data.message));
            }
        })
    }

    return (
        <CompanyDefault>
            <div className='p-5 min-h-screen'>
                {
                    auth.loading ? <Loading />
                    : (
                        <div>
                            <div className='mt-5'>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon icon={ faBuilding } className='hidden md:flex text-8xl' />
                                    <div className="w-full md:ml-5">
                                        <span className="flex justify-between">
                                            <h1 className='text-2xl font-bold text-primary'>{ vacancyData.role }</h1>
                                            <FontAwesomeIcon
                                                onClick={ () => setCanEdit(!canEdit) }
                                                className='cursor-pointer h-8 text-primary hover:text-bright-purple ease-out duration-200'
                                                icon={ faGear }
                                            />
                                        </span>
                                        <p className='text-xl w-full font-medium text-dark-purple'>{ vacancyData.company.company.name }</p>
                                    </div>
                                </div>
                                <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                                    <h2 className='text-xl mb-5 font-medium text-dark-purple'>
                                        Informações sobre a Vaga
                                    </h2>
                                    <div className='md:flex md:justify-between'>
                                        <div className='md:w-6/12 w-full mr-5'> 
                                            <SelectInput placeholder='Setor' options={["Recursos Humanos", "Tecnologia", "Administrativo", "Financeiro", "Operacional", "Comércio", "Serviços", "Saúde", "Industrial", "Construção"]} consultPackage={ consultPackage } name="sector" id='sector' disabled={ !canEdit } />
                                            <TextAreaInput name="description" id="description" row={ 7 } consultPackage={ consultPackage } placeholder='Descrição' value={ vacancyData.description } disabled={ !canEdit } />  
                                        </div>
                                        <div className='md:w-6/12 w-full'>
                                            <SelectInput placeholder='Região' options={["Sul", "Sudeste", "Centro-Oeste", "Norte", "Nordeste"]} name='region' id='region' consultPackage={ consultPackage } disabled={ !canEdit } />                   
                                            <div className="md:flex justify-between">
                                                <SelectInput placeholder='Moeda' options={["Real", "Dolar", "Euro"]} size='medium' consultPackage={ consultPackage } name="currency" id="currency" disabled={ !canEdit } />  
                                                <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='salary' id='salary' consultPackage={ consultPackage } disabled={ !canEdit }/>
                                            </div>
                                            <SelectInput placeholder='Carga Horária' options={["Integral", "Meio Período", "Home Office"]} consultPackage={ consultPackage } name="workload" id='workload' disabled={ !canEdit } />
                                            <SelectInput placeholder='Tipo de Contratação' options={["Estágio", "Permanente", "Temporário"]} consultPackage={ consultPackage } name="type" id='type' disabled={ !canEdit } />
                                        </div>
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
                            </div>
                        </div>
                    )
                }
            </div>
        </CompanyDefault>
    );
}

export default CompanyVacancyDetail;
