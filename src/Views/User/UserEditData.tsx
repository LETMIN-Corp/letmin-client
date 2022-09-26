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
import useUser from '../../Utils/useUser';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';

interface IUserData {
    createdAt: string;
    name: string;
    email: string;
    username: string;
    picture: string;
    formations: Array<any>;
    experiences: Array<any>;
    [key: string]: any;
}

const UserEditData : React.FC = () => {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const user = useUser();

    const [userData, setUserData] = useState<IUserData>({
        createdAt: '',
        name: '',
        email: '',
        username: '',
        picture: '',
        formations: [],
        experiences: [],
    });

    const [searchExperiences, setSearchExperiences] = useState('');
    const [searchFormations, setSearchFormations] = useState('');

    useEffect((): void => {
        user.getUserData()
        .then((res : any) => {
            if (res.status != 200) {
                navigate('/user/vacancy/search');
            }

            let userdata = res.data.user;
            userdata.formations = [
                {
                    name: 'Dev Junior',
                    institution: 'Firework',
                    start: '2015',
                    finish: '2017',
                    description: 'Desenvolvimento de sites básicos. Aprimoramento de conhecimento front-end e mobile.',
                },
                {
                    name: 'Dev Pleno',
                    institution: 'Paschoalotto',
                    start: '2017',
                    finish: '2020',
                    description: 'Desenvolvimento de sistemas aprofundados para a empresa com Laravel.',
                },
                {
                    name: 'Professor',
                    institution: 'SENAI Bauru',
                    start: '2021',
                    finish: '2023',
                    description: 'Professor para os 1os e 2os anos do curso técnico de Informática.',
                }
            ]
            userdata.experiences = [
                {
                    name: 'Ensino Médio Profissionalizante',
                    institution: "CTI",
                    start:'2012',
                    finish:'2014',
                    description: 'Ensino Médio Profissionalizante no curso técnico de Informática',
                },
                {
                    name: 'Graduação',
                    institution: "Unesp Bauru",
                    start:'2015',
                    finish:'2020',
                    description: 'Graduação em Ciências de Computação',
                },
                {
                    name: 'Bacharelado em Ciências da Computação',
                    institution: "Unesp Bauru",
                    start:'2021',
                    finish:'2025',
                    description: 'Grau superior em Ciências da Computação. Ainda em andamento.',
                },
            ]
            setUserData(res.data.user);
        });
        window.document.title = 'Letmin - Perfil';

    }, []);

    const [openModal, setOpenModal] = useState(false);    
    const [modalExitIsOpen, setModalExitIsOpen] = useState(false);  /* Modal de confirmar para sair da página */
    const [XPModalIsOpen, setXPModalIsOpen] = useState(false);  /* Modal de adicionar dados */
    const [formationModalIsOpen, setFormationModalIsOpen] = useState(false);  /* Modal de adicionar dados */

    function returnToUserPage () {  /* Utilizada pelo botão de retornar */
        navigate('/user/profile');
    }
   
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

    const handleConfirmAddXp = () => {
        setUserData({
            ...userData,
            formations: [...userData.formations, userData.experiences],
        });

        setXPModalIsOpen(false);
    }
    const handleCloseModalAddXp = () => {
        setXPModalIsOpen(false);
    }

    const filterExperiences = (value : string) => {
        if(value.length === 0) {
            setUserData({
                ...userData,
                experiences: userData.experiences,
            });
            return
        }
        setUserData({
            ...userData,
            experiences: userData.experiences.filter((experience : any) => {
                return experience.name.toLowerCase().includes(value.toLowerCase());
            }
        )});
    }

    const filterFormations = (value : string) => {
        if(value.length === 0) {
            setUserData({
                ...userData,
                formations: userData.formations,
            });
            return;
        }
        setUserData({
            ...userData,
            formations: userData.formations.filter((formation : any) => {
                return formation.name.toLowerCase().includes(value.toLowerCase());
            }
        )});
    }

    const handleConfirmAddFormation = () => {
        setFormationModalIsOpen(false);
        setUserData({
            ...userData,
            formations: [...userData.formations, userData.formations],
        });
    }
    const handleCloseModalAddFormation = () => {
        setFormationModalIsOpen(false);
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }

    return (
        <UserDefault>
            {
                loading ? <Loading /> : (
                    <div className='min-h-90'>
                    <main>
                        <div className='h-32 bg-lively-purple'></div>
                            <div className='relative md:justify-end mx-5'>
                                <div className='mt-24 md:mt-5 text-lg flex items-center'>
                                    <img src={ userData.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'} className='rounded-full border-4 border-lively-purple absolute left-0 -top-20 bg-white' />
                                    <FontAwesomeIcon icon={ faPencil } className='rounded-full border-4 border-lively-purple text-white bg-lively-purple ml-28 p-3 z-10' />
                                    <div className='mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full'>
                                        Usuário desde { new Date(userData.createdAt).toLocaleDateString('pt-BR') }
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mt-5 md:mt-10 mx-5 w-2/3'>
                                <div className='font-medium text-xl text-dark-purple'>Informações do Usuário</div>
                                <div className='font-medium text-lg w-96'>
                                    <TextInput placeholder='Nome' type='text' name='name' id='userName' consultPackage={ consultPackage }/> 
                                </div>
                                <div className='font-medium text-lg'>
                                    <TextAreaInput name="description" id="description" row={ 6 } consultPackage={ consultPackage } placeholder='Descrição'/>
                                </div>
                            </div>
                        </main>
                        <section className='px-5 mt-10'>
                            <div className='mt-24 md:my-4 text-lg flex justify-between items-center w-full'>
                                <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                                <button onClick={ () => setXPModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-full text-white hover:bg-dark-purple ease-out duration-200'>
                                    <FontAwesomeIcon icon={ faPlus } />
                                </button>
                                {
                                    XPModalIsOpen && (
                                        <FormModal handleClose={ handleCloseModalAddXp } handleConfirm={ handleConfirmAddXp } title='Adicionar Experiência Prévia'>
                                            <div className='my-2'>
                                                <TextInput type={ InputTypesEnum.text } placeholder='Nome' name='experience-name' id='experience-name' consultPackage={ consultPackage } />
                                                <TextInput type={ InputTypesEnum.text } placeholder='Empresa' name='experience-enterprise' id='experience-enterprise' consultPackage={ consultPackage } />
                                                <div className='flex justify-between content-between items-center px-2'>
                                                    <div className="pb-2">
                                                        <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                                    </div>
                                                    <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='experience-yearS' id='experience-yearS' consultPackage={ consultPackage } />
                                                    <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='experience-yearF' id='experience-yearF' consultPackage={ consultPackage } />
                                                </div>
                                                <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='experience-description' id='experience-description' consultPackage={ consultPackage } />
                                                {/* titulo / empresa / inicio (mm/aa) / termino(mm/aa) / descricao */}
                                            </div>
                                        </FormModal>
                                    )
                                }
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...userData.experiences,
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
                                <button onClick={ () => setFormationModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-full text-white hover:bg-dark-purple ease-out duration-200'>
                                    <FontAwesomeIcon icon={ faPlus } />
                                </button>
                                {
                                    formationModalIsOpen && (
                                        <FormModal handleClose={ handleCloseModalAddFormation } handleConfirm={ handleConfirmAddFormation } title='Adicionar Formação Acadêmica'>
                                            <div className='my-2'>
                                                <TextInput type={ InputTypesEnum.text } placeholder='Formação' name='formation-name' id='formation-name' consultPackage={ consultPackage } />
                                                <TextInput type={ InputTypesEnum.text } placeholder='Instituição' name='formation-institution' id='formation-institution' consultPackage={ consultPackage } />
                                                <div className='flex justify-between content-between items-center px-2'>
                                                    <div className="pb-2">
                                                        <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                                    </div>
                                                    <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='formation-yearS' id='formation-yearS' consultPackage={ consultPackage } />
                                                    <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='formation-yearF' id='formation-yearF' consultPackage={ consultPackage } />
                                                </div>
                                                <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='formation-description' id='formation-description' consultPackage={ consultPackage } />
                                            </div>
                                        </FormModal>
                                    )
                                }
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...userData.formations,
                                    ].map((card, key) => <UserExperienceCard key={ key } card={ card } /> )
                                }
                            </div>
                        </section>
                        <div className='ml-3 flex justify-end w-full px-5'>
                            <SecondaryButton text='Cancelar' handleClick= {() => setModalExitIsOpen(true)}/>
                            { modalExitIsOpen && <ConfirmationModal title='Sair da Edição' text='Os dados editados ainda não foram salvos. Você realmente deseja sair da edição?' handleClose={ () => setModalExitIsOpen(false) } handleConfirm={ returnToUserPage } /> }
                            <div className='mx-5'>
                                <FormButton text='Salvar' />
                            </div>
                        </div>
                    </div>
                )
            }
        </UserDefault>
    );
}

export default UserEditData;
