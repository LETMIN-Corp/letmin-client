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
import { faHandshake, faInfo, faLink, faPlus, faPencil, faCalendar, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';
import useUser from '../../Utils/useUser';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';

interface IUserData {
    createdAt: string;
    name: string;
    description: string;
    email: string;
    username: string;
    picture: string;
    formations: Array<any>;
    experiences: Array<any>;
    [key: string]: any;
}

interface CanExclude {
    [key: string]: boolean;
}

const UserEditData : React.FC = () => {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const user = useUser();

    const [userData, setUserData] = useState<IUserData>({
        createdAt: '',
        name: '',
        description: '',
        email: '',
        username: '',
        picture: '',
        formations: [{
            name : '',
            institution: '',
            start: '',
            finish: '',
            description: '',
        }],
        experiences: [{
            role: '',
            company: '',
            start: '',
            finish: '',
            description: '',
        }],
    });

    const [userTypedData, setUserTypedData] = useState<IUserData>({
        createdAt: '',
        name: '',
        description: '',
        email: '',
        username: '',
        picture: '',
        formations: [{
            name : '',
            institution: '',
            start: '',
            finish: '',
            description: '',
        }],
        experiences: [{
            role: '',
            company: '',
            start: '',
            finish: '',
            description: '',
        }],
    });

    const [searchExperiences, setSearchExperiences] = useState('');
    const [searchFormations, setSearchFormations] = useState('');

    function getDBUserData()
    {
        user.getUserData()
        .then((res : any) => {
            if (res.status != 200) {
                navigate('/user/profile');
            }

            setUserData(res.data.user);
            setUserTypedData(res.data.user);
            // let userdata = res.data.user;
            /* 
            userData.experiences = [
                {
                    role: 'Dev Junior',
                    company: 'Firework',
                    start: '2015',
                    finish: '2017',
                    description: 'Desenvolvimento de sites básicos. Aprimoramento de conhecimento front-end e mobile.',
                },
                {
                    role: 'Dev Pleno',
                    company: 'Paschoalotto',
                    start: '2017',
                    finish: '2020',
                    description: 'Desenvolvimento de sistemas aprofundados para a empresa com Laravel.',
                },
                {
                    role: 'Professor',
                    company: 'SENAI Bauru',
                    start: '2021',
                    finish: '2023',
                    description: 'Professor para os 1os e 2os anos do curso técnico de Informática.',
                }
            ]
            userData.formations = userData.formations || [
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
            ] */
            // setUserData(res.data.user);
        });
    }

    useEffect((): void => {
        getDBUserData();
        window.document.title = 'Letmin - Perfil';

    }, []);

    const [openModal, setOpenModal] = useState(false);    
    const [modalExitIsOpen, setModalExitIsOpen] = useState(false);  /* Modal de confirmar para sair da página */
    const [modalSaveConfirmationIsOpen, setModalSaveConfirmationIsOpen] = useState(false);  /* Modal de confirmar para salvar os dados */
    const [XPModalIsOpen, setXPModalIsOpen] = useState(false);  /* Modal de adicionar dados */
    const [formationModalIsOpen, setFormationModalIsOpen] = useState(false);  /* Modal de adicionar dados */

    const [canExclude, setCanExclude] = useState<CanExclude>({
        experiences: false,
        formations: false,
    });



    function returnToUserPage () {  /* Utilizada pelo botão de retornar */
        navigate('/user/profile');
    }
   
    function getInputValue (name: string): string {
        const [type, data] = name.split('-'); //experience-role  -> experience role

        if(data == undefined)
            return userData[name];
        else 
            return userTypedData[type][data];
    }
    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-'); //experience-role  -> experience role

        
        if(data == undefined)
        {
            setUserData({
                    ...userData,
                    [name]: value,
                }
            );
        }
        else {          
            setUserTypedData({
                ...userTypedData,
                [type]: { ...userTypedData[type], [data]: value }
            });
        }
    }

    function updateUserData(){
        user.updateUser(userData);
    }

    const handleConfirmAddXp = () => {
        setXPModalIsOpen(false);
        userData.experiences.push(userTypedData.experiences)
        userTypedData.experiences = [];
        // console.log(userData.experiences)
        // user.updateUserExperiences(userTypedData);
        // getDBUserData();
        // getDBUserData();
    }
    const handleCloseModalAddXp = () => {
        setXPModalIsOpen(false);
        getDBUserData();
    }

    function flipExclude(property: string)
    {
        setCanExclude({
            ...canExclude,
            [property]: !canExclude[property],
        });
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
        if(userTypedData.formations.length == 0){
            //mostrar mensagem de "ain bababa vc tem erro"
            return;
        }
        setFormationModalIsOpen(false);
        userData.formations.push(userTypedData.formations)
        userTypedData.formations = [];
        // user.updateUserFormations(userTypedData);
        // getDBUserData();
        // getDBUserData();
    }
    const handleCloseModalAddFormation = () => {
        setFormationModalIsOpen(false);
        getDBUserData();
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
                                    <img src={ userData.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'} className='rounded-full border-4 border-lively-purple absolute left-0 -top-20 bg-white' referrerPolicy='no-referrer' />
                                    <FontAwesomeIcon icon={ faPencil } className='rounded-full border-4 border-lively-purple text-white bg-lively-purple ml-28 p-3 z-10' />
                                    <div className='mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full'>
                                        Usuário desde { new Date(userData.createdAt).toLocaleDateString('pt-BR') }
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mt-5 md:mt-10 mx-5 w-2/3'>
                                <div className='font-medium text-xl text-dark-purple'>Informações do Usuário</div>
                                <div className='font-medium w-96'>
                                    <TextInput placeholder='Nome' type='text' name='name' id='userName' consultPackage={ consultPackage }/> 
                                </div>
                                <div className='font-medium'>
                                    <TextAreaInput name="description" id="description" row={ 6 } consultPackage={ consultPackage } placeholder='Descrição'/>
                                </div>
                            </div>
                        </main>
                        <section className='px-5 mt-10'>
                            <div className='mt-24 md:my-4 text-lg flex justify-between items-center w-full'>
                                <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                                <div>
                                    <button onClick={ () => setXPModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                                        <FontAwesomeIcon icon={ faPlus } />
                                    </button>
                                    {
                                        XPModalIsOpen && (
                                            <FormModal handleClose={ handleCloseModalAddXp } handleConfirm={ handleConfirmAddXp } title='Adicionar Experiência Prévia'>
                                                <div className='my-2'>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Nome' name='experiences-role' id='experiences-role' consultPackage={ consultPackage } required/>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Empresa' name='experiences-company' id='experiences-company' consultPackage={ consultPackage } required />
                                                    <div className='flex justify-between content-between items-center px-2'>
                                                        <div className="pb-2">
                                                            <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                                        </div>
                                                        <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='experiences-start' id='experiences-start' consultPackage={ consultPackage } required/>
                                                        <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='experiences-finish' id='experiences-finish' consultPackage={ consultPackage } required/>
                                                    </div>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='experiences-description' id='experiences-description' consultPackage={ consultPackage } required/>
                                                    {/* titulo / empresa / inicio (mm/aa) / termino(mm/aa) / descricao */}
                                                </div>
                                            </FormModal>
                                        )
                                    }
                                    <button onClick={ () => flipExclude('experiences') } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                                        <FontAwesomeIcon icon={ faTrash } />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    userData.experiences.map((card, key) => <UserExperienceCard key={ key } card={ card } exclude={ canExclude.experiences } /> )
                                }
                            </div>
                        </section>
                        <section className='px-5 my-10'>
                            <div className='mt-24 md:my-4 text-lg flex justify-between items-center w-full'>
                                <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                                {/* <button className='bg-primary mr-3 w-20 h-12 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                                    <FontAwesomeIcon icon={ faPlusCircle } />
                                </button>   botao antigo */}
                                <div>
                                    <button onClick={ () => setFormationModalIsOpen(true) } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                                        <FontAwesomeIcon icon={ faPlus } />
                                    </button>
                                    {
                                        formationModalIsOpen && (
                                            <FormModal handleClose={ handleCloseModalAddFormation } handleConfirm={ handleConfirmAddFormation } title='Adicionar Formação Acadêmica'>
                                                <div className='my-2'>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Formação' name='formations-name' id='formations-name' consultPackage={ consultPackage } required/>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Instituição' name='formations-institution' id='formations-institution' consultPackage={ consultPackage } required/>
                                                    <div className='flex justify-between content-between items-center px-2'>
                                                        <div className="pb-2">
                                                            <FontAwesomeIcon icon={ faCalendar } size="2x" />
                                                        </div>
                                                        <TextInput type={ InputTypesEnum.number } placeholder='Ano de Início' size="medium" name='formations-start' id='formations-start' min={4} max={4} consultPackage={ consultPackage } required/>
                                                        <TextInput type={ InputTypesEnum.number } placeholder='Ano de Término' size="medium" name='formations-finish' id='formations-finish' consultPackage={ consultPackage } required/>
                                                    </div>
                                                    <TextInput type={ InputTypesEnum.text } placeholder='Descrição' name='formations-description' id='formations-description' consultPackage={ consultPackage } required/>
                                                </div>
                                            </FormModal>
                                        )
                                    }<button onClick={ () => flipExclude('formations') } className='bg-primary w-10 h-10 mr-3 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                                    <FontAwesomeIcon icon={ faTrash } />
                                </button>
                            </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    userData.formations.map((card, key) => <UserExperienceCard key={ key } card={ card } exclude={ canExclude.formations } /> )
                                }
                            </div>
                        </section>
                        <div className='ml-3 flex justify-end w-full px-5'>
                            
                            <SecondaryButton text='Cancelar' handleClick= {() => setModalExitIsOpen(true)}/>
                            { modalExitIsOpen && <ConfirmationModal title='Sair da Edição' text='Os dados editados ainda não foram salvos. Você realmente deseja sair da edição?' handleClose={ () => setModalExitIsOpen(false) } handleConfirm={ returnToUserPage } /> }
                            
                            <div className='mx-5'>
                                <FormButton text='Salvar' handleClick= {() => setModalSaveConfirmationIsOpen(true)}/>
                                { modalSaveConfirmationIsOpen && <ConfirmationModal title='Salvar os dados' text='Você realmente deseja salvar estas modificações?' handleClose={ () => setModalSaveConfirmationIsOpen(false) } handleConfirm={ updateUserData } /> }
                            </div>
                        </div>
                    </div>
                )
            }
        </UserDefault>
    );
}

export default UserEditData;
