import { faBuilding, faGear, faPlus, faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelectInput from "../../Components/Inputs/SelectInput";

import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import MaskTypesEnum from '../../Enums/MaskTypesEnum';
import { formatErrors } from '../../Utils/ToastMessages';
import useAuth from '../../Utils/useAuth';
import useCompany from '../../Utils/useCompany';
import CompanyDefault from './CompanyDefault';

import {
    EditVacancyData,
    wantedSkillsData
} from '../../Interfaces/CompanyInterfaces';
import UserSkillCard from "../../Components/Cards/UserSkillsCard";
import FormModal from "../../Components/Modals/FormModal";
import InputTypesEnum from "../../Enums/InputTypesEnum";
import RadioInput from "../../Components/Inputs/RadioInput";

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
    const [vacancyData, setVacancyData] = useState<EditVacancyData>(new EditVacancyData());
    const [skillModalIsOpen, setSkillModalIsOpen] = useState(false);
    const [canExcludeSkills, setCanExcludeSkills] = useState(false);
    const [skillData, setSkillData] = useState<wantedSkillsData>(new wantedSkillsData());

    function getDBVacancyData() {
        company.getCompanyVacancy(id!).then((res: any) => {
            if (res.status != 200) {
                company.dispatchError('Erro ao carregar dados');
                navigate('/company/indicators');
            }
            setVacancyData(res.data.vacancy);
        });
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Vaga';
        getDBVacancyData();
    }, []);

    function setInputValue(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-'); //experience-role -> experience role
        if (data == undefined) {
            return setVacancyData({
                ...vacancyData,
                [name as keyof EditVacancyData]: value,
            });
        }
        return setSkillData({
            ...skillData,
            [data as keyof wantedSkillsData]: value,
        });
    }

    function getInputValue(name: string): any {
        const [type, data] = name.split('-'); //experience-role  -> experience role

        if (data == undefined) return vacancyData[name as keyof EditVacancyData];
        else return skillData[data as keyof wantedSkillsData];
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    const checkSkillData = () => {
        company.checkNewSkill(skillData).then((res: any) => {
            if (res.status !== 200) {
                company.dispatchError(formatErrors(res.data.message));
                return;
            }

            setVacancyData({
                ...vacancyData,
                wantedSkills: [...vacancyData.wantedSkills, skillData]
            });
        });
    };

    const excludeSkill = (index: number): void => {
        if (!canExcludeSkills) return;
        const newSkills = vacancyData.wantedSkills.filter((skill, i) => i !== index);
        setVacancyData({
            ...vacancyData,
            wantedSkills: newSkills
        });
    };

    function updateVacancyData() {
        company.updateVacancy(vacancyData).then((res: any) => {
            if (res.data.success) {
                company.dispatchSuccess(res.data.message);
                getDBVacancyData();
                setCanEdit(false);
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
                                    <span className="flex justify-between ml-5">
                                            {
                                                !canEdit ? (
                                                    <h1 className="text-2xl font-bold text-primary">
                                                    {vacancyData.role}
                                                    </h1>
                                                ) : (
                                                    <TextInput
                                                        placeholder="Cargo"
                                                        type="text"
                                                        size="extra-large"
                                                        name="role"
                                                        id="role"
                                                        consultPackage={consultPackage}
                                                        disabled={!canEdit}
                                                    />
                                                )
                                            }
                                        <FontAwesomeIcon
                                            onClick={() => setCanEdit(!canEdit)}
                                            className="cursor-pointer h-8 text-primary mr-4"
                                            icon={faGear}
                                        />
                                    </span>
                                    <p className="text-xl ml-5 w-full font-medium text-dark-purple">
                                        {vacancyData.company.name}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5">
                                <h2 className="text-xl mb-5 font-medium text-dark-purple">
                                    Informações sobre a Vaga
                                </h2>
                                <div className="md:flex md:justify-between">
                                    <div className="md:w-6/12 w-full mr-5">
                                        <SelectInput placeholder='Setor' options={["Recursos Humanos", "Tecnologia", "Administrativo", "Financeiro", "Operacional", "Comércio", "Serviços", "Saúde", "Industrial", "Construção"]} consultPackage={ consultPackage } name="sector" id='sector' disabled={ !canEdit } />
                                        <TextAreaInput
                                            name="description"
                                            id="description"
                                            row={7}
                                            consultPackage={consultPackage}
                                            placeholder="Descrição"
                                            value={vacancyData.description}
                                            disabled={!canEdit}
                                        />
                                        <div className="pb-2">
                                <div className="text-dark-purple flex font-medium text-md">
                                    <span className='mr-2'>Habilidades Desejadas</span>
                                    {
                                        canEdit && (
                                        <>
                                            <button
                                                onClick={ () => setCanExcludeSkills(!canExcludeSkills) }
                                                className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-dark-red ease-out duration-200"
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        canExcludeSkills
                                                            ? faTrashArrowUp
                                                            : faTrash
                                                    }
                                                />
                                            </button>
                                            <div 
                                                className='bg-primary h-10 w-10 text-white text-center w-10 py-2 rounded-md drop-shadow-lg md:text-lg hover:bg-bold-purple ease-out duration-200'
                                                onClick={() => setSkillModalIsOpen(true)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </div>
                                        </>
                                        )
                                    }
                                </div>
                                <div>
                                    {
                                        vacancyData.wantedSkills.map((card: wantedSkillsData, index) => 
                                            <div className='mt-2' key={index} >
                                                <UserSkillCard
                                                    card={card} 
                                                    canExclude={canExcludeSkills}
                                                    exclude={() => excludeSkill(index)}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                                    </div>
                                    <div className="md:w-6/12 w-full">
                                        <SelectInput placeholder='Região' options={["Sul", "Sudeste", "Centro-Oeste", "Norte", "Nordeste"]} name='region' id='region' consultPackage={ consultPackage } disabled={ !canEdit } /> 
                                        <div className="md:flex justify-between">
                                            <SelectInput placeholder='Moeda' options={["Real", "Dolar", "Euro"]} size='medium' consultPackage={ consultPackage } name="currency" id="currency" disabled={ !canEdit } />
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
                                        <SelectInput placeholder='Carga Horária' options={["Integral", "Meio Período", "Home Office"]} consultPackage={ consultPackage } name="workload" id='workload' disabled={ !canEdit } />
                                        <SelectInput placeholder='Tipo de Contratação' options={["Estágio", "Permanente", "Temporário"]} consultPackage={ consultPackage } name="type" id='type' disabled={ !canEdit } />
                                        <TextInput
                                            placeholder="Anos de experiência"
                                            limit={2}
                                            type={InputTypesEnum.number}
                                            size="large"
                                            name="yearsOfExperience"
                                            id="yearsOfExperience"
                                            disabled={!canEdit}
                                            consultPackage={consultPackage}
                                        />
                                    </div>
                                </div>
                                {
                                    skillModalIsOpen && (
                                    <FormModal
                                        handleClose={() => setSkillModalIsOpen(!skillModalIsOpen)}
                                        handleConfirm={checkSkillData}
                                        title="Adicionar Habilidade"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={ InputTypesEnum.text }
                                                placeholder="Nome"
                                                name="wantedSkills-name"
                                                limit={ 30 }
                                                id="name"
                                                consultPackage={ consultPackage }
                                            />
                                            <RadioInput
                                                name="wantedSkills-level"
                                                id="wantedSkills"
                                                options={['Iniciante', 'Intermediário', 'Avançado']}
                                                labelClass="text-lg"
                                                consultPackage={consultPackage}
                                            />
                                        </div>
                                    </FormModal>
                                )}
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
