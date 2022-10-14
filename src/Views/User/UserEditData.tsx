import {
    faPencil,
    faPlus,
    faTrash,
    faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormButton from '../../Components/Buttons/FormButton';
import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import FormModal from '../../Components/Modals/FormModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import { dispatchError, dispatchSuccess, formatErrors } from '../../Utils/ToastMessages';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

class Iformation {
    name: string = '';
    institution: string = '';
    start: string = '';
    finish: string = '';
    description: string = '';
}

class Iexperience {
    role: string = '';
    company: string = '';
    start: string = '';
    finish: string = '';
    description: string = '';
}

class BasicUserData {
    createdAt: string = '';
    name: string = '';
    role: string = '';
    description: string = '';
    email: string = '';
    username: string = '';
    picture: string = '';
}

class UserTypedData extends BasicUserData {
    experience: Iexperience = new Iexperience();
    formation: Iformation = new Iformation();
    [key: string]: any;
}

class UserData extends BasicUserData {
    experiences: Array<Iexperience> = [ new Iexperience() ];
    formations: Array<Iformation> = [ new Iformation() ];
    [key: string]: any;
}

interface CanExclude {
    experiences: boolean;
    formations: boolean;
}

const UserEditData: React.FC = () => {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const user = useUser();

    const [userData, setUserData] = useState<UserData>(new UserData());
    const [userTypedData, setUserTypedData] = useState<UserTypedData>(new UserTypedData());

    function getDBUserData() {
        user.getUserData().then((res: any) => {
            if (res.status != 200) {
                navigate('/user/profile');
            }
            setUserData(res.data.user);
        });
    }

    useEffect((): void => {
        getDBUserData();
        window.document.title = 'Letmin - Perfil';
    }, []);

    const [modalExitIsOpen, setModalExitIsOpen] =
        useState(false); /* Modal de confirmar para sair da página */
    const [modalSaveConfirmationIsOpen, setModalSaveConfirmationIsOpen] =
        useState(false); /* Modal de confirmar para salvar os dados */
    const [ExpModalIsOpen, setExpModalIsOpen] =
        useState(false); /* Modal de adicionar dados */
    const [formationModalIsOpen, setFormationModalIsOpen] =
        useState(false); /* Modal de adicionar dados */

    const [canExclude, setCanExclude] = useState<CanExclude>({
        experiences: false,
        formations: false,
    });

    /* Utilizada pelo botão de retornar */
    function returnToUserPage() {
        navigate('/user/profile');
    }

    function getInputValue(name: string): string {
        const [type, data] = name.split('-'); //experience-role  -> experience role

        if (data == undefined) return userData[name];
        else return userTypedData[type][data];
    }

    function setInputValue(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-'); //experience-role  -> experience role
        if (data == undefined) {
            setUserData({ ...userData, [name]: value, });
            setUserTypedData({ ...userTypedData, [name]: value, });
        } else {
            setUserTypedData({
                ...userTypedData,
                [type]: {
                    ...userTypedData[type],
                    [data]: value,
                },
            });
        }
    }

    function updateUserData() {
        user.updateUser(userData).then((res: any) => {
            if (res.status === 200) {
                dispatchSuccess(res.data.message);
                navigate('/user/profile');
            } else dispatchError(formatErrors(res.data.message));
        });
    }

    const checkExperienceData = () => {
        user.checkNewExperience(userTypedData.experience).then((res: any) => {
            if (res.status == 200) {
                setUserData({
                    ...userData,
                    experiences: [...userData.experiences, userTypedData.experience],
                })
                setUserTypedData({
                    ...userTypedData,
                    experience: new Iexperience(),
                });
                
                return setExpModalIsOpen(false);
            }
            return dispatchError(formatErrors(res.data.message));
        });
        
    };

    function flipExclude(property: string) {
        setCanExclude({
            ...canExclude,
            [property]: !canExclude[property as keyof CanExclude],
        });
    }

    function excludeFormation(id: number) {
        if (canExclude.formations) {
            setUserData({
                ...userData,
                formations: userData.formations.filter((formation, index) => index != id),
            });
        }
    }

    function excludeExperience(id: number) {
        if (canExclude.experiences) {
            setUserData({
                ...userData,
                experiences: userData.experiences.filter((experience, index) => index != id),
            });
        }
    }

    const checkFormationData = () => {
        user.checkNewFormation(userTypedData.formation).then((res: any) => {
            if (res.status == 200) {
                setUserData({
                    ...userData,
                    formations: [...userData.formations, userTypedData.formation],
                })
                setUserTypedData({
                    ...userTypedData,
                    formation: new Iformation(),
                });

                return setFormationModalIsOpen(false);
            }
            return dispatchError(formatErrors(res.data.message));
        });
    };

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    return (
        <UserDefault>
            {loading ? (
                <Loading />
            ) : (
                <div className="min-h-90">
                    <main>
                        <div className="h-32 bg-lively-purple"></div>
                        <div className="relative md:justify-end mx-5">
                            <div className="md:mt-5 text-lg flex items-center">
                                <img
                                    src={
                                        userData.picture.replace('s96-c', 's150-c') ||
                                        'https://via.placeholder.com/150'
                                    }
                                    className="rounded-full border-4 border-lively-purple absolute left-0 -top-20 bg-white"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="font-medium mt-24 text-lg">
                                    <div className="flex items-center text-dark-purple">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={ faPencil }
                                        />
                                        <h1 className="text-xl font-medium">Editar</h1>
                                    </div>
                                    <div className="text-sm md:text-md text-dark-gray">
                                        <span className='mr-1'>Usuário desde</span>
                                        {
                                            new Date(userData.createdAt).toLocaleDateString(
                                                'pt-BR',
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 mx-5 font-medium">
                            <div className="text-xl text-dark-purple">
                                Informações do Usuário
                            </div>
                            <div>
                                <div className="w-full md:flex justify-between">
                                    <TextInput
                                        size="large"
                                        placeholder="Nome"
                                        type="text"
                                        name="name"
                                        id="userName"
                                        consultPackage={ consultPackage }
                                    />
                                    <TextInput
                                        size="medium"
                                        placeholder="Cargo"
                                        type="text"
                                        name="role"
                                        id="userRole"
                                        consultPackage={ consultPackage }
                                    />
                                </div>
                                <div>
                                    <TextAreaInput
                                        name="description"
                                        id="description"
                                        row={ 6 }
                                        consultPackage={ consultPackage }
                                        placeholder="Descrição"
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <section className="px-5 mt-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">
                                Experiência Profissional
                            </div>
                            <div>
                                <button
                                    onClick={ () => flipExclude('experiences') }
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-dark-red ease-out duration-200"
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            canExclude.experiences
                                                ? faTrashArrowUp
                                                : faTrash
                                        }
                                    />
                                </button>
                                <button
                                    onClick={ () => setExpModalIsOpen(true) }
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {ExpModalIsOpen && (
                                    <FormModal
                                        handleClose={ () => setExpModalIsOpen(!ExpModalIsOpen) }
                                        handleConfirm={ checkExperienceData }
                                        title="Adicionar Experiência Prévia"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={ InputTypesEnum.text }
                                                placeholder="Nome"
                                                name="experience-role"
                                                limit={ 30 }
                                                id="experience-role"
                                                consultPackage={ consultPackage }
                                            />
                                            <TextInput
                                                type={ InputTypesEnum.text }
                                                placeholder="Empresa"
                                                name="experience-company"
                                                limit={ 30 }
                                                id="experience-company"
                                                consultPackage={ consultPackage }
                                            />
                                            <div className="block md:flex justify-between">
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Início"
                                                    size="medium"
                                                    limit={4}
                                                    min={1900}
                                                    max={new Date().getFullYear()}
                                                    name="experience-start"
                                                    id="experience-start"
                                                    consultPackage={consultPackage}
                                                />
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Término"
                                                    size="medium"
                                                    limit={4}
                                                    min={1900}
                                                    max={new Date().getFullYear()}
                                                    name="experience-finish"
                                                    id="experience-finish"
                                                    consultPackage={consultPackage}
                                                />
                                            </div>
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Descrição"
                                                name="experience-description"
                                                limit={128}
                                                id="experience-description"
                                                consultPackage={consultPackage}
                                            />
                                        </div>
                                    </FormModal>
                                )}
                            </div>
                        </div>
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {
                                userData.experiences.map((card, key) => (
                                    <UserExperienceCard
                                        key={ key }
                                        card={ card }
                                        canExclude= { canExclude.experiences }
                                        exclude={ () => excludeExperience(key) }
                                    />
                                ))
                            }
                        </div>
                    </section>
                    <section className="px-5 my-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">
                                Formação Acadêmica
                            </div>
                            <div>
                                <button
                                    onClick={() => flipExclude('formations')}
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-dark-red ease-out duration-200"
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            canExclude.formations
                                                ? faTrashArrowUp
                                                : faTrash
                                        }
                                    />
                                </button>
                                <button
                                    onClick={() => setFormationModalIsOpen(true)}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={ faPlus } />
                                </button>
                                {formationModalIsOpen && (
                                    <FormModal
                                        handleClose={() => setFormationModalIsOpen(!formationModalIsOpen)}
                                        handleConfirm={checkFormationData}
                                        title="Adicionar Formação Acadêmica"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Formação"
                                                name="formation-name"
                                                limit={30}
                                                id="formation-name"
                                                consultPackage={consultPackage}
                                            />
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Instituição"
                                                name="formation-institution"
                                                limit={30}
                                                id="formation-institution"
                                                consultPackage={consultPackage}
                                            />
                                            <div className="block md:flex justify-between">
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Início"
                                                    limit={4}
                                                    size="medium"
                                                    name="formation-start"
                                                    id="formation-start"
                                                    min={4}
                                                    max={4}
                                                    consultPackage={consultPackage}
                                                />
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Término"
                                                    limit={4}
                                                    size="medium"
                                                    name="formation-finish"
                                                    id="formation-finish"
                                                    min={4}
                                                    max={4}
                                                    consultPackage={consultPackage}
                                                />
                                            </div>
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Descrição"
                                                name="formation-description"
                                                limit={128}
                                                id="formation-description"
                                                consultPackage={consultPackage}
                                            />
                                        </div>
                                    </FormModal>
                                )}
                            </div>
                        </div>
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {userData.formations.map((card, key) => (
                                <UserExperienceCard
                                    key={key}
                                    card={card}
                                    canExclude={canExclude.formations}
                                    exclude={() => excludeFormation(key)}
                                />
                            ))}
                        </div>
                    </section>
                    <div className="md:ml-3 my-5 flex justify-between md:justify-end w-full px-5">
                        <div className="mr-2">
                            <FormButton
                                isDanger={true}
                                text="Cancelar"
                                handleClick={() => setModalExitIsOpen(true)}
                            />
                        </div>
                        <FormButton
                            text="Salvar"
                            handleClick={() => setModalSaveConfirmationIsOpen(true)}
                        />
                    </div>
                    {modalExitIsOpen && (
                        <ConfirmationModal
                            title="Sair da Edição"
                            text="Os dados editados ainda não foram salvos. Você realmente deseja sair da edição?"
                            handleClose={() => setModalExitIsOpen(false)}
                            handleConfirm={returnToUserPage}
                        />
                    )}
                    {modalSaveConfirmationIsOpen && (
                        <ConfirmationModal
                            title="Salvar os dados"
                            text="Você realmente deseja salvar estas modificações?"
                            handleClose={() => setModalSaveConfirmationIsOpen(false)}
                            handleConfirm={updateUserData}
                        />
                    )}
                </div>
            )}
        </UserDefault>
    );
};

export default UserEditData;
