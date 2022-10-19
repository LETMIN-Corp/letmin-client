import { faBriefcase, faPlus, faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import FormButton from '../../Components/Buttons/FormButton';
import UserSkillCard from '../../Components/Cards/UserSkillsCard';
import RadioInput from '../../Components/Inputs/RadioInput';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import FormModal from '../../Components/Modals/FormModal';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import { VacancyData, wantedSkillsData } from '../../Interfaces/CompanyInterfaces';
import { formatErrors } from '../../Utils/ToastMessages';
import useCompany from '../../Utils/useCompany';
import CompanyDefault from './CompanyDefault';

const CompanyRegisterVacancy = () => {
    const company = useCompany();

    const [skillModalIsOpen, setSkillModalIsOpen] = useState(false);
    const [canExcludeSkills, setCanExcludeSkills] = useState(false);
    const [vacancyData, setVacancyData] = useState<VacancyData>(new VacancyData());
    const [skillData, setSkillData] = useState<wantedSkillsData>(new wantedSkillsData());

    useEffect((): void => {
        window.document.title = 'Letmin - Inserção de Vagas';
    });

    const handleSubmit = async () => {
        company.registerVacancy(vacancyData).then((res: any) => {
            if (res.status !== 200) {
                company.dispatchError(formatErrors(res.data.message));
                return;
            }
            company.dispatchSuccess(res.data.message);
        });
    };

    const checkSkillData = () => {
        company.checkNewSkill(skillData).then((res: any) => {
            if (res.status !== 200) {
                company.dispatchError(formatErrors(res.data.message));
                return;
            }

            setVacancyData({
                ...vacancyData,
                wantedSkills: [...vacancyData.wantedSkills, skillData],
            });
            setSkillModalIsOpen(false);
            setSkillData(new wantedSkillsData());
        });
    };

    const excludeSkill = (index: number): void => {
        if (!canExcludeSkills) return;
        const newSkills = vacancyData.wantedSkills.filter((skill, i) => i !== index);
        setVacancyData({
            ...vacancyData,
            wantedSkills: newSkills,
        });
    };

    function getInputValue(name: string): any {
        const [type, data] = name.split('-');

        if (data == undefined) return vacancyData[name as keyof VacancyData];
        else return skillData[data as keyof wantedSkillsData];
    }

    function setInputValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');
        if (data == undefined) {
            return setVacancyData({
                ...vacancyData,
                [name as keyof VacancyData]: value,
            });
        }
        return setSkillData({
            ...skillData,
            [data as keyof wantedSkillsData]: value,
        });
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    return (
        <CompanyDefault>
            <div className="p-5 min-h-screen">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                    <span>Cadastro de Vagas</span>
                </h1>

                <div className="w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5">
                    <h1 className="text-xl text-bold-purple font-medium">Dados da Vaga</h1>
                    <div className="md:flex md:justify-between">
                        <div className="md:w-6/12 w-full mr-5">
                            <TextInput
                                placeholder="Cargo"
                                type={InputTypesEnum.text}
                                name="role"
                                id="role"
                                consultPackage={consultPackage}
                            />
                            <SelectInput
                                placeholder="Região"
                                options={['Sul', 'Sudeste', 'Centro-Oeste', 'Norte', 'Nordeste']}
                                name="region"
                                id="region"
                                consultPackage={consultPackage}
                            />
                            <TextAreaInput
                                name="description"
                                id="description"
                                row={6}
                                consultPackage={consultPackage}
                                placeholder="Descrição"
                            />
                            <TextInput
                                placeholder="Anos de experiência"
                                limit={2}
                                useMask={MaskTypesEnum.integer}
                                type={InputTypesEnum.number}
                                name="yearsOfExperience"
                                id="yearsOfExperience"
                                consultPackage={consultPackage}
                            />
                        </div>
                        <div className="md:w-6/12 w-full md:mt-1">
                            <SelectInput
                                placeholder="Carga Horária"
                                options={['Integral', 'Meio Período', 'Home Office']}
                                consultPackage={consultPackage}
                                name="workload"
                                id="workload"
                            ></SelectInput>
                            <div className="md:flex justify-between">
                                <SelectInput
                                    placeholder="Moeda"
                                    options={['Real', 'Dolar', 'Euro']}
                                    size="medium"
                                    consultPackage={consultPackage}
                                    name="currency"
                                    id="currency"
                                ></SelectInput>
                                <TextInput
                                    placeholder="Salário"
                                    useMask={MaskTypesEnum.money}
                                    limit={12}
                                    type={InputTypesEnum.text}
                                    size="large"
                                    name="salary"
                                    id="salary"
                                    consultPackage={consultPackage}
                                />
                            </div>
                            <SelectInput
                                placeholder="Setor"
                                options={[
                                    'Recursos Humanos',
                                    'Tecnologia',
                                    'Administrativo',
                                    'Financeiro',
                                    'Operacional',
                                    'Comércio',
                                    'Serviços',
                                    'Saúde',
                                    'Industrial',
                                    'Construção',
                                ]}
                                consultPackage={consultPackage}
                                name="sector"
                                id="sector"
                            ></SelectInput>
                            <div className="pb-2">
                                <div className="text-dark-purple font-medium text-md">Tipo de Contratação</div>
                                <div>
                                    <RadioInput
                                        name="type"
                                        id="worktype"
                                        options={['Estágio', 'Permanente', 'Temporário']}
                                        labelClass="text-lg"
                                        consultPackage={consultPackage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pb-5">
                        <div className="text-dark-purple flex justify-between items-center font-medium text-md">
                            <div className="mr-2 font-medium text-lg">Habilidades Desejadas</div>
                            <div className="flex">
                                <button
                                    onClick={() => setCanExcludeSkills(!canExcludeSkills)}
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-dark-red ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={canExcludeSkills ? faTrashArrowUp : faTrash} />
                                </button>
                                <button
                                    className="bg-primary h-10 w-10 text-white text-center w-10 py-2 rounded-md drop-shadow-lg md:text-lg hover:bg-bold-purple ease-out duration-200"
                                    onClick={() => setSkillModalIsOpen(true)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {vacancyData.wantedSkills.map((card: wantedSkillsData, index) => (
                                <div className="mt-2" key={index}>
                                    <UserSkillCard
                                        card={card}
                                        canExclude={canExcludeSkills}
                                        exclude={() => excludeSkill(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {skillModalIsOpen && (
                    <FormModal
                        handleClose={() => setSkillModalIsOpen(!skillModalIsOpen)}
                        handleConfirm={checkSkillData}
                        title="Adicionar Habilidade"
                    >
                        <div className="my-2">
                            <TextInput
                                type={InputTypesEnum.text}
                                placeholder="Nome"
                                name="wantedSkills-name"
                                limit={30}
                                id="name"
                                consultPackage={consultPackage}
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
                <div className="flex w-full justify-end">
                    <FormButton text="Cadastrar" handleClick={handleSubmit} />
                </div>
            </div>
        </CompanyDefault>
    );
};

export default CompanyRegisterVacancy;
