import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import FormButton from '../../Components/Buttons/FormButton';
import FormModal from '../../Components/Modals/FormModal';
import BigFormModal from '../../Components/Modals/BigFormModal';
import Menu from '../../Components/Layouts/Menu';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { useEffect, useState } from 'react';
import UserProfileCard from '../../Components/Cards/UserProfileCard';
import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import InfoModal from '../../Components/Modals/InfoModal';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import ImgUserDefault from '../../Assets/user_default.jpg';
import UserDefault from './UserDefault'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faInfo, faLink, faPlus, faPencil, faCalendar } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';
import CompanyRegisterVacancy from '../Company/CompanyRegisterVacancy';

const UserEditData : React.FC = () => {
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Perfil';
    }, []);

    const [openModal, setOpenModal] = useState(false);    
    const [modalExitIsOpen, setModalExitIsOpen] = useState(false);  /* Modal de confirmar para sair da página */
    const [XPModalIsOpen, setXPModalIsOpen] = useState(false);  /* Modal de adicionar dados */
    const [formationModalIsOpen, setFormationModalIsOpen] = useState(false);  /* Modal de adicionar dados */
    const [ExperienceName, setXPName] = useState('');
    const [ExperienceEnterprise, setXPEnterprise] = useState('');
    const [ExperienceStartTime, setXPStartTime] = useState('');
    const [ExperienceFinishTime, setXPFinishTime] = useState('');
    const [ExperienceDescription, setXPDescription] = useState('');
    const [searchExperiences, setSearchExperiences] = useState('');
    const [FormationName, setFormationName] = useState('');
    const [FormationInstitution, setFormationInstitution] = useState('');
    const [FormationStartTime, setFormationStartTime] = useState('');
    const [FormationFinishTime, setFormationFinishTime] = useState('');
    const [FormationDescription, setFormationDescription] = useState('');
    const [searchFormations, setSearchFormations] = useState('');

    function returnToUserPage () {  /* Utilizada pelo botão de retornar */
        navigate('/user/profile');
    }

    interface IUserData {
        /* [key: string]: string;             
            --Antes era utilizado assim, pois a vaga só usava string. Agora, o candidato usa objetos para suas variáveis, como mostrado abaixo.
            PRECISA BOTAR A VARIAVEL DE FOTO */
        [key: number]: {
            userName: string,
            description: string
        };
    }
    const initialState = {
        userName: 'Fulano',
        description: 'Sou um dev Pleno em busca de oportunidades.',
        previousExperiences: [{name:'', institutuion:'', timeStart:'', timeFinish:'', description:''}],
        academicFormation: [{name:'', institutuion:'', timeStart:'', timeFinish:'', description:''}]
    }
    
    const [userData, setUserData] = useState<IUserData>(initialState);
    function getInputValue (name: string): string {
        return userData[name];      /* Arrumar para dados do usuário */
    }
    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        setUserData({
                ...userData,
                [name]: value,
            }
        );
    }

    interface XPInterface {
        [key: number] : {
            name: string;
            institution: string;
            timeStart:string;
            timeFinish:string;
            description: string;
        }
        [Symbol.iterator] : () => IterableIterator<{
            name: string;
            institution: string;
            timeStart:string;
            timeFinish:string;
            description: string;
        }>;
        length: number;

        filter(arg0: (experience: { title: string; }) => boolean): import("react").SetStateAction<XPInterface>;
    }
    const handleConfirmAddXp = () => {
        setXPModalIsOpen(false);
        if(ExperienceName.length === 0 || ExperienceStartTime.length === 0 || ExperienceFinishTime.length === 0
            || ExperienceDescription.length === 0 || ExperienceEnterprise.length === 0 || ExperienceStartTime > ExperienceFinishTime) {
            return;
        }
        setAllExperiences([...allExperiences, { name:ExperienceName, institution: ExperienceEnterprise, timeStart:ExperienceStartTime, 
            timeFinish:ExperienceFinishTime, description:ExperienceDescription }]);   /* TROCAR TIME POR EXPERIENCETIME APÓS */
        setXPName('');
    }
    const handleCloseModalAddXp = () => {
        setXPModalIsOpen(false);
        /* setFolderName(''); */
    }
    const [allExperiences, setAllExperiences] = useState<XPInterface>([]);
    const [experiences, setExperiences] = useState<XPInterface>([]);
    useEffect((): void => {
        setAllExperiences([
            {
                name: 'Dev Junior',
                institution: 'Firework',
                timeStart: '2015',
                timeFinish: '2017',
                description: 'Desenvolvimento de sites básicos. Aprimoramento de conhecimento front-end e mobile.',
            },
            {
                name: 'Dev Pleno',
                institution: 'Paschoalotto',
                timeStart: '2017',
                timeFinish: '2020',
                description: 'Desenvolvimento de sistemas aprofundados para a empresa com Laravel.',
            },
            {
                name: 'Professor',
                institution: 'SENAI Bauru',
                timeStart: '2021',
                timeFinish: '2023',
                description: 'Professor para os 1os e 2os anos do curso técnico de Informática.',
            }
        ]);
    }, []);
    const filterExperiences = (value : string) => {
        if(value.length === 0) {
            setExperiences(allExperiences);
            return;
        }

        setExperiences(allExperiences.filter((folder : { title : string}) => folder.title.toLowerCase().includes(value.toLowerCase())));
    }
    useEffect((): void => {
        filterExperiences(searchExperiences);
    }, [searchExperiences]);


    interface FormationInterface {
        [key: number] : {
            name: string;
            institution: string;
            timeStart:string;
            timeFinish:string;
            description: string;
        }
        [Symbol.iterator] : () => IterableIterator<{
            name: string;
            institution: string;
            timeStart:string;
            timeFinish:string;
            description: string;
        }>;
        length: number;

        filter(arg0: (experience: { title: string; }) => boolean): import("react").SetStateAction<FormationInterface>;
    }
    const [allFormations, setAllFormations] = useState<FormationInterface>([]);
    const [formations, setFormations] = useState<FormationInterface>([]);
    useEffect((): void => {
        setAllFormations([
            {
                name: 'Ensino Médio Profissionalizante',
                institution: "CTI",
                timeStart:'2012',
                timeFinish:'2014',
                description: 'Ensino Médio Profissionalizante no curso técnico de Informática',
            },
            {
                name: 'Graduação',
                institution: "Unesp Bauru",
                timeStart:'2015',
                timeFinish:'2020',
                description: 'Graduação em Ciências de Computação',
            },
            {
                name: 'Bacharelado em Ciências da Computação',
                institution: "Unesp Bauru",
                timeStart:'2021',
                timeFinish:'2025',
                description: 'Grau superior em Ciências da Computação. Ainda em andamento.',
            },
        ]);
    }, []);
    const filterFormations = (value : string) => {
        if(value.length === 0) {
            setFormations(allFormations);
            return;
        }

        setFormations(allFormations.filter((folder : { title : string}) => folder.title.toLowerCase().includes(value.toLowerCase())));
    }
    useEffect((): void => {
        filterFormations(searchFormations);
    }, [searchFormations]);

    const handleConfirmAddFormation = () => {
        setFormationModalIsOpen(false);
        if(FormationName.length === 0 || FormationInstitution.length === 0 || 
            FormationStartTime.length === 0 || FormationFinishTime.length === 0
             || FormationStartTime > FormationFinishTime ) {
            return;
        }
        setAllFormations([...allFormations, { name: FormationName, institution: FormationInstitution,
             timeStart:FormationStartTime, timeFinish:FormationFinishTime, description:FormationDescription, }]);
        console.log(FormationName);
        setFormationName('');
    }
    const handleCloseModalAddFormation = () => {
        setFormationModalIsOpen(false);
        /* setFolderName(''); */
    }


    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }
    const consultPackageXPName = {
        getValue: () => { return ExperienceName },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setXPName(e.target.value) },
    };
    const consultPackageXPEnterprise = {
        getValue: () => { return ExperienceEnterprise },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setXPEnterprise(e.target.value) },
    };
    const consultPackageXPStartTime = {
        getValue: () => { return ExperienceStartTime },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setXPStartTime(e.target.value) },
    };
    const consultPackageXPFinishTime = {
        getValue: () => { return ExperienceFinishTime },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setXPFinishTime(e.target.value) },
    };
    const consultPackageXPDescription = {
        getValue: () => { return ExperienceDescription },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setXPDescription(e.target.value) },
    };
    const consultPackageFormationName = {
        getValue: () => { return FormationName },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFormationName(e.target.value) },
    };
    const consultPackageFormationInstitution = {
        getValue: () => { return FormationInstitution },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFormationInstitution(e.target.value) },
    };
    const consultPackageFormationStartTime = {
        getValue: () => { return FormationStartTime },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFormationStartTime(e.target.value) },
    };
    const consultPackageFormationFinishTime = {
        getValue: () => { return FormationFinishTime },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFormationFinishTime(e.target.value) },
    };
    const consultPackageFormationDescription = {
        getValue: () => { return FormationDescription },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFormationDescription(e.target.value) },
    };
    /* Pergunta: Eu estou criando um consultPackage para cada input que eu faço.
    A estrutura deles é parecida todavia, só muda o dado que está voltando.
    Logo, não há um jeito de automatizar isso? Vou ter que criar um novo para
    cada dado diferente que eu for botar? */

    return (
        <UserDefault>
            <div className='min-h-90'>
            <main>
                <div className='h-32 bg-lively-purple'></div>
                    {/* ANTIGO: BOTÃO DE EDITAR SOBRE A FOTO DO USUÁRIO
                    <div className='relative md:justify-end mx-5'>
                        <div className='mt-24 md:mt-5 text-lg flex items-center'>
                            <img src='https://via.placeholder.com/150' className='rounded-full border-4 border-lively-purple absolute left-0 -top-20 z-0' />
                            <FontAwesomeIcon icon={ faPencil } className='rounded-full border-4 border-black bg-lively-purple ml-28 p-3 z-10' />
                        </div>
                    </div> */}
                    <div className='relative flex md:justify-end mx-5 py-4'>
                        <img src={ImgUserDefault} className='rounded-full border-4 border-lively-purple absolute left-0 -top-20 bg-white' />
                        <div className='mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full'>
                            
                        </div>
                    </div>
                    <div className='mt-5 md:mt-10 mx-5 w-2/3'>
                        <div className='font-medium text-xl text-dark-purple'>Informações do Usuário</div>
                        <div className='font-medium text-lg w-96'>
                            <TextInput placeholder='Nome de Usuário' type='text' name='userName' id='userName' consultPackage={ consultPackage }/> 
                        </div>
                        <div className='font-medium text-lg'>
                            <TextAreaInput name="description" id="description" row={ 6 } consultPackage={ consultPackage } placeholder='Descrição do Usuário'/>
                        </div>
                    </div>
                </main>
                <section className='px-5 mt-10'>
                    <div className='mt-24 md:my-4 text-lg flex justify-between items-center w-full'>
                        <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                        <button onClick={ () => setXPModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                            <FontAwesomeIcon icon={ faPlus } />
                        </button>
                        {
                            XPModalIsOpen && (
                                <FormModal handleClose={ handleCloseModalAddXp } handleConfirm={ handleConfirmAddXp } title='Adicionar Experiência Prévia'>
                                    <div className='my-2'>
                                        <TextInput type={ InputTypesEnum.text } placeholder='Nome' name='experience-name' id='experience-name' consultPackage={ consultPackageXPName } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Empresa' name='experience-enterprise' id='experience-enterprise' consultPackage={ consultPackageXPEnterprise } />
                                        <div className='flex justify-between content-between items-center px-2'>
                                            <div className="pb-2">
                                                <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                            </div>
                                            <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='experience-yearS' id='experience-yearS' consultPackage={ consultPackageXPStartTime } />
                                            <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='experience-yearF' id='experience-yearF' consultPackage={ consultPackageXPFinishTime } />
                                        </div>
                                        <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='experience-description' id='experience-description' consultPackage={ consultPackageXPDescription } />
                                        {/* titulo / empresa / inicio (mm/aa) / termino(mm/aa) / descricao */}
                                    </div>
                                </FormModal>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            [
                                ...allExperiences,
                            ].map((card, key) => <UserExperienceCard key={ key } card={ card } /> )
                        }
                    </div>
                </section>
                <section className='px-5 my-10'>
                    <div className='mt-24 md:my-4 text-lg flex justify-between items-center w-full'>
                        <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                        {/* <button className='bg-primary mr-3 w-20 h-12 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                            <FontAwesomeIcon icon={ faPlusCircle } />
                        </button>   botao antigo */}
                        <button onClick={ () => setFormationModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                            <FontAwesomeIcon icon={ faPlus } />
                        </button>
                        {
                            formationModalIsOpen && (
                                <FormModal handleClose={ handleCloseModalAddFormation } handleConfirm={ handleConfirmAddFormation } title='Adicionar Formação Acadêmica'>
                                    <div className='my-2'>
                                        <TextInput type={ InputTypesEnum.text } placeholder='Formação' name='formation-name' id='formation-name' consultPackage={ consultPackageFormationName } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Instituição' name='formation-institution' id='formation-institution' consultPackage={ consultPackageFormationInstitution } />
                                        <div className='flex justify-between content-between items-center px-2'>
                                            <div className="pb-2">
                                                <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                            </div>
                                            <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='formation-yearS' id='formation-yearS' consultPackage={ consultPackageFormationStartTime } />
                                            <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='formation-yearF' id='formation-yearF' consultPackage={ consultPackageFormationFinishTime } />
                                        </div>
                                        <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='formation-description' id='formation-description' consultPackage={ consultPackageFormationDescription } />
                                    </div>
                                </FormModal>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            [
                                ...allFormations,
                            ].map((card, key) => <UserExperienceCard key={ key } card={ card } /> )
                            /*1a de hoje (20/09): pra experiencia, a gnt ta usando só nome e tempo.
                            Por isso, o card só aceita esses dois tipos. Crio um novo tipo de card
                            para mostrar as formações, agora com os dados certos? */
                        }
                    </div>
                </section>
                <div className='ml-3 flex justify-between w-1/3'>
                    <FormButton text='Salvar' />
                    { modalExitIsOpen && <ConfirmationModal title='Sair da Edição' text='Os dados editados ainda não foram salvos. Você realmente deseja sair da edição?' handleClose={ () => setModalExitIsOpen(false) } handleConfirm={ returnToUserPage } /> }
                    <SecondaryButton text='Cancelar' handleClick= {() => setModalExitIsOpen(true)}/>
                </div>
            </div>
        </UserDefault>
    );
}

export default UserEditData;
