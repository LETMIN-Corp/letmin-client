import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import FormButton from '../../Components/Buttons/FormButton';
import FormModal from '../../Components/Modals/FormModal';
import BigFormModal from '../../Components/Modals/BigFormModal';
import Menu from '../../Components/Layouts/Menu';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { useEffect, useState } from 'react';
import UserProfileCard from '../../Components/Cards/UserProfileCard';
import InfoModal from '../../Components/Modals/InfoModal';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import UserDefault from './UserDefault'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faInfo, faLink, faPlus, faPencil } from '@fortawesome/free-solid-svg-icons';
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

    function returnToUserPage () {  /* Utilizada pelo botão de retornar */
        navigate('/user/profile');
    }

    interface IUserData {
        /* [key: string]: string;             --Antes era utilizado assim, pois a vaga só usava string. Agora, o candidato usa objetos para suas variáveis, como mostrado abaixo. */
        [key: number]: {
            name: string,
            time: string
        };
    }
    /* 1 - No CompanyRegisterVacancy.tsx, esse initialState é usado com os dados
       da vaga. Nessa página AQUI, eu preciso trocar pelos dados do usuário.
       A questão é: o que eu boto, exatamente? Porque o usuário tem muitas informações;
       cada item da experiência profissional, sua data, a formação acadêmica e etc.
       Logo, devo tentar passar todos? Se sim, como faço isso?
       R: Tempo de experiência E Formação acadêmica vêm como um array de objetos
       { nome:*, tempo:* } */
    const initialState = {
        userName: '',
        description: '',
        previousExperiences: [{name:'', time:''}],
        academicFormation: [{name:'', time:''}]
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
            name: string; time:string;
        }
        [Symbol.iterator] : () => IterableIterator<{
            name: string; time:string;
        }>;
        length: number;

        filter(arg0: (experience: { title: string; }) => boolean): import("react").SetStateAction<XPInterface>;
    }
    const handleConfirmAddXp = () => {
        setXPModalIsOpen(false);/* 
        if(XPName.length === 0 || XPTime.length === 0) {
            return;
        }
        setAllFolders([...allFolders, { title: folderName }]);
        setFolderName(''); */
    }
    const handleCloseModalAddXp = () => {
        setXPModalIsOpen(false);
        /* setFolderName(''); */
    }
    const [allExperiences, setAllExperiences] = useState<XPInterface>([]);
    const [experiencess, setExperiences] = useState<XPInterface>([]);
    useEffect((): void => {
        setAllExperiences([
            {
                name: 'teste',
                time: '6 months'
            },
            {
                name: 'teste',
                time: '2 months'
            },
            {
                name: 'teste',
                time: '1 year'
            }
        ]);
    }, []);


    const handleConfirmAddFormation = () => {
        setFormationModalIsOpen(false);/* 
        if(folderName.length === 0) {
            return;
        }
        setAllFolders([...allFolders, { title: folderName }]);
        setFolderName(''); */
    }
    const handleCloseModalAddFormation = () => {
        setFormationModalIsOpen(false);
        /* setFolderName(''); */
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }

    return (
        <UserDefault>
            <div className='min-h-90'>
            <main>
                <div className='h-32 bg-lively-purple'></div>
                    <div className='relative md:justify-end mx-5'>
                        <div className='mt-24 md:mt-5 text-lg flex items-center'>
                            <img src='https://via.placeholder.com/150' className='rounded-full border-4 border-lively-purple absolute left-0 -top-20 z-0' />
                            <FontAwesomeIcon icon={ faPencil } className='rounded-full border-4 border-black bg-lively-purple ml-28 p-3 z-10' />
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
                                        <TextInput type={ InputTypesEnum.text } placeholder='Nome' name='experience-name' id='experience-name' consultPackage={ consultPackage } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Tempo' name='experience-time' id='experience-time' consultPackage={ consultPackage } />
                                        {/* titulo / empresa / inicio (mm/aa) / termino(mm/aa) / descricao */}
                                    </div>
                                </FormModal>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* 2 - Aqui, o elemento 'UserProfileCard' utiliza de elementos
                        que só aceitam texto. Todavia, eu tenho que botar o TextInput
                        dentro desse card. Como posso fazer isso, ou por qual card
                        devo substituir?
                        R: Não bote os text input direto; ao clicar sobre o blob de
                        experiência, abra um modal com os dados daquele item de
                        experiência.*/}
                        {
                            [
                                {
                                    name: 'teste',
                                    time: '6 months'
                                },
                                {
                                    name: 'teste',
                                    time: '2 months'
                                },
                                {
                                    name: 'teste',
                                    time: '1 year'
                                }
                            ].map((card, key) => <UserProfileCard key={ key } card={ card } /> )
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
                                <BigFormModal handleClose={ handleCloseModalAddFormation } handleConfirm={ handleConfirmAddFormation } title='Adicionar Formação Acadêmica'>
                                    <div className='my-2'>
                                        <TextInput type={ InputTypesEnum.text } placeholder='Formação' name='formation-name' id='formation-name' consultPackage={ consultPackage } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Instituição' name='formation-institution' id='formation-institution' consultPackage={ consultPackage } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Tipo de Formação' name='formation-type' id='formation-type' consultPackage={ consultPackage } />
                                        <TextInput type={ InputTypesEnum.text } placeholder='Área Profissional' name='formation-area' id='formation-area' consultPackage={ consultPackage } />
                                        <div className='flex justify-between px-2'>
                                            <TextInput type={ InputTypesEnum.text } placeholder='Mês de Início' name='formation-monthS' id='formation-monthS' consultPackage={ consultPackage } />
                                            <TextInput type={ InputTypesEnum.text } placeholder='Ano de Início' name='formation-yearS' id='formation-yearS' consultPackage={ consultPackage } />
                                        </div>
                                        <div className='flex justify-between px-2'>
                                            <TextInput type={ InputTypesEnum.text } placeholder='Mês de Término' name='formation-monthF' id='formation-monthF' consultPackage={ consultPackage } />
                                            <TextInput type={ InputTypesEnum.text } placeholder='Ano de Término' name='formation-yearF' id='formation-yearF' consultPackage={ consultPackage } />
                                        </div>
                                        {/* instituição / tipo de diploma(bacharelado/licenciatura) / Área / / inicio (mm/aa) / termino(mm/aa) */}
                                    </div>
                                </BigFormModal>
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            [
                                {
                                    name: 'CTI',
                                    time: '2020 - 2023'
                                },
                                {
                                    name: 'CTI',
                                    time: '2020 - 2023'
                                },
                                {
                                    name: 'CTI',
                                    time: '2020 - 2023'
                                },
                                {
                                    name: 'CTI',
                                    time: '2020 - 2023'
                                }
                            ].map((card, key) => <UserProfileCard key={ key } card={ card } /> )
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
