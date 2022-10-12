import {
    faCalendar,
    faPencil,
    faPlus,
    faTrash,
    faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormButton from '../../Components/Buttons/FormButton';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import FormModal from '../../Components/Modals/FormModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import { dispatchError, dispatchSuccess, formatErrors } from '../../Utils/ToastMessages';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

interface Iformations {
    name: string;
    institution: string;
    start: string;
    finish: string;
    description: string;
}

interface Iexperiences {
    role: string;
    company: string;
    start: string;
    finish: string;
    description: string;
}

class UserData {
    createdAt = '';
    name = '';
    role = '';
    description = '';
    email = '';
    username = '';
    picture = '';
    formations: Array<Iformations> = [
        {
            name: '',
            institution: '',
            start: '',
            finish: '',
            description: '',
        },
    ];
    experiences: Array<Iexperiences> = [
        {
            role: '',
            company: '',
            start: '',
            finish: '',
            description: '',
        },
    ];
    [key: string]: any;
}

interface CanExclude {
    [key: string]: boolean;
}

const UserEditData: React.FC = () => {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const user = useUser();

    const [userData, setUserData] = useState<UserData>(new UserData());
    const [userTypedData, setUserTypedData] = useState<UserData>(new UserData());

    function getDBUserData() {
        user.getUserData().then((res: any) => {
            if (res.status != 200) {
                navigate('/user/profile');
            }

            setUserData(res.data.user);
            console.log(res.data.user);
            setUserTypedData(res.data.user);
        });
    }

    useEffect((): void => {
        getDBUserData();
        window.document.title = 'Letmin - Perfil';
    }, []);

    const [modalExitIsOpen, setModalExitIsOpen] =
        useState(false); /* Modal de confirmar para sair da página */
    const [modalExcludeExperienceIsOpen, setModalExcludeExperienceIsOpen] =
        useState(false); /* Modal de exclusão de experiências */
    const [modalExcludeFormationIsOpen, setModalExcludeFormationIsOpen] =
        useState(false); /* Modal de exclusão de formação */
    const [modalSaveConfirmationIsOpen, setModalSaveConfirmationIsOpen] =
        useState(false); /* Modal de confirmar para salvar os dados */
    const [XPModalIsOpen, setXPModalIsOpen] =
        useState(false); /* Modal de adicionar dados */
    const [formationModalIsOpen, setFormationModalIsOpen] =
        useState(false); /* Modal de adicionar dados */

    const [canExclude, setCanExclude] = useState<CanExclude>({
        experiences: false,
        formations: false,
    });

    const [isExclusionApproved, setExclusionApproval] = useState(false);

    function returnToUserPage() {
        /* Utilizada pelo botão de retornar */
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
            setUserData({
                ...userData,
                [name]: value,
            });
        } else {
            setUserTypedData({
                ...userTypedData,
                [type]: { ...userTypedData[type], [data]: value },
            });
        }
    }

    function updateUserData() {
        user.updateUser(userData).then((res: any) => {
            if (res.status === 200) {
                dispatchSuccess('Os dados do usuário foram atualizados com sucesso!');
                navigate('/user/profile');
            } else dispatchError(formatErrors(res.data.message));
        });
    }

    const handleConfirmAddXp = () => {
        console.log('aaaa', userTypedData.experiences);
        user.checkNewExperience(userTypedData.experiences).then((res: any) => {
            if (res.status == 400) {
                dispatchError(formatErrors(res.data.message));
                console.log('erro', res.data);
                return;
            }
        });
        setXPModalIsOpen(false);
        userData.experiences.push(userTypedData.experiences);
        userTypedData.experiences = [];
    };

    const handleCloseModalAddXp = () => {
        setXPModalIsOpen(false);
    };

    function flipExclude(property: string) {
        setCanExclude({
            ...canExclude,
            [property]: !canExclude[property],
        });
    }

    function approveExclusion() {
        setExclusionApproval(true);
        setModalExcludeExperienceIsOpen(false);
    }

    function excludeFormation(id: number) {
        //console.log(id)
        if (canExclude.formations) {
            userData.formations.splice(id, 1);
            setUserData(userData);
        }
    }

    function excludeExperience(id: number) {
        if (canExclude.experiences) {
            // setModalExcludeExperienceIsOpen(true)
            // if(isExclusionApproved)
            // {
            userData.experiences.splice(id, 1);
            setUserData(userData);
            //     setModalExcludeExperienceIsOpen(false);
            //     setExclusionApproval(false);
            // }
        }
    }

    const handleConfirmAddFormation = () => {
        user.checkNewFormation(userTypedData.formations).then((res: any) => {
            if (res.status == 400) {
                dispatchError(formatErrors(res.data.message));
                console.log('erro', res.data);
                return;
            }
            setFormationModalIsOpen(false);
            userData.formations.push(userTypedData.formations);
            userTypedData.formations = [];
        });
    };

    const handleCloseModalAddFormation = () => {
        setFormationModalIsOpen(false);
        // getDBUserData();
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
                                            icon={faPencil}
                                        />
                                        <h1 className="text-xl font-medium">Editar</h1>
                                    </div>
                                    <div className="text-sm md:text-md text-dark-gray">
                                        Usuário desde{' '}
                                        {new Date(userData.createdAt).toLocaleDateString(
                                            'pt-BR',
                                        )}
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
                                        consultPackage={consultPackage}
                                    />
                                    <TextInput
                                        size="medium"
                                        placeholder="Cargo"
                                        type="text"
                                        name="role"
                                        id="userRole"
                                        consultPackage={consultPackage}
                                    />
                                </div>
                                <div>
                                    <TextAreaInput
                                        name="description"
                                        id="description"
                                        row={6}
                                        consultPackage={consultPackage}
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
                                {userData.experiences.length != 0 && (
                                    <button
                                        onClick={() => flipExclude('experiences')}
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
                                )}
                                {modalExcludeExperienceIsOpen && (
                                    <ConfirmationModal
                                        title="Excluir esta experiência"
                                        text="Você realmente excluir esta experiência?"
                                        handleClose={() =>
                                            setModalExcludeExperienceIsOpen(false)
                                        }
                                        handleConfirm={approveExclusion}
                                    />
                                )}

                                <button
                                    onClick={() => setXPModalIsOpen(true)}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {XPModalIsOpen && (
                                    <FormModal
                                        handleClose={handleCloseModalAddXp}
                                        handleConfirm={handleConfirmAddXp}
                                        title="Adicionar Experiência Prévia"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Nome"
                                                name="experiences-role"
                                                limit={30}
                                                id="experiences-role"
                                                consultPackage={consultPackage}
                                                required
                                            />
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Empresa"
                                                name="experiences-company"
                                                limit={30}
                                                id="experiences-company"
                                                consultPackage={consultPackage}
                                                required
                                            />
                                            <div className="block md:flex justify-between">
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Início"
                                                    size="medium"
                                                    limit={4}
                                                    name="experiences-start"
                                                    id="experiences-start"
                                                    consultPackage={consultPackage}
                                                    required
                                                />
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Término"
                                                    size="medium"
                                                    limit={4}
                                                    name="experiences-finish"
                                                    id="experiences-finish"
                                                    consultPackage={consultPackage}
                                                    required
                                                />
                                            </div>
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Descrição"
                                                name="experiences-description"
                                                limit={128}
                                                id="experiences-description"
                                                consultPackage={consultPackage}
                                                required
                                            />
                                        </div>
                                    </FormModal>
                                )}
                            </div>
                        </div>
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {userData.experiences.map((card, key) => (
                                <UserExperienceCard
                                    key={key}
                                    card={card}
                                    canExclude={canExclude.experiences}
                                    exclude={() => excludeExperience(key)}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="px-5 my-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">
                                Formação Acadêmica
                            </div>
                            <div>
                                {userData.formations.length != 0 && (
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
                                )}
                                <button
                                    onClick={() => setFormationModalIsOpen(true)}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {formationModalIsOpen && (
                                    <FormModal
                                        handleClose={handleCloseModalAddFormation}
                                        handleConfirm={handleConfirmAddFormation}
                                        title="Adicionar Formação Acadêmica"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Formação"
                                                name="formations-name"
                                                limit={30}
                                                id="formations-name"
                                                consultPackage={consultPackage}
                                                required
                                            />
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Instituição"
                                                name="formations-institution"
                                                limit={30}
                                                id="formations-institution"
                                                consultPackage={consultPackage}
                                                required
                                            />
                                            <div className="block md:flex justify-between">
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Início"
                                                    limit={4}
                                                    size="medium"
                                                    name="formations-start"
                                                    id="formations-start"
                                                    min={4}
                                                    max={4}
                                                    consultPackage={consultPackage}
                                                    required
                                                />
                                                <TextInput
                                                    type={InputTypesEnum.number}
                                                    useMask="year"
                                                    placeholder="Ano de Término"
                                                    limit={4}
                                                    size="medium"
                                                    name="formations-finish"
                                                    id="formations-finish"
                                                    min={4}
                                                    max={4}
                                                    consultPackage={consultPackage}
                                                    required
                                                />
                                            </div>
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Descrição"
                                                name="formations-description"
                                                limit={128}
                                                id="formations-description"
                                                consultPackage={consultPackage}
                                                required
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
