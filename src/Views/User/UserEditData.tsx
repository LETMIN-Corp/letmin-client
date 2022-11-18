import { faPencil, faPlus, faTrash, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormButton from '../../Components/Buttons/FormButton';
import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import UserSkillCard from '../../Components/Cards/UserSkillsCard';
import RadioInput from '../../Components/Inputs/RadioInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import FormModal from '../../Components/Modals/FormModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import {
    Iexperience,
    Iformation,
    Iskill,
    IUserData,
    UserCanExclude,
    UserEditModals,
    UserTypedData,
} from '../../Interfaces/UserInterfaces';
import { dispatchError, dispatchSuccess, formatErrors } from '../../Utils/ToastMessages';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

const UserEditData: React.FC = () => {
    const { loading } = useLoading();
    const navigate = useNavigate();
    const user = useUser();

    const [userData, setUserData] = useState<IUserData>(new IUserData());
    const [userTypedData, setUserTypedData] = useState<UserTypedData>(new UserTypedData());
    const [modalIsOpen, setModalIsOpen] = useState<UserEditModals>(new UserEditModals());
    const [canExclude, setCanExclude] = useState<UserCanExclude>(new UserCanExclude());

    function flipModal(modal: string) {
        setModalIsOpen({ ...modalIsOpen, [modal]: !modalIsOpen[modal as keyof UserEditModals] });
    }

    function flipExclude(property: string) {
        setCanExclude({
            ...canExclude,
            [property]: !canExclude[property as keyof UserCanExclude],
        });
    }

    function getDBUserData() {
        user.getUserData().then((res: any) => {
            if (res.status != 200) navigate('/user/profile');
            setUserData(res.data.user);
        });
    }

    useEffect((): void => {
        getDBUserData();
        window.document.title = 'Letmin - Perfil';
    }, []);

    /* Utilizada pelo botão de retornar */
    function returnToUserPage() {
        navigate('/user/profile');
    }

    function getInputValue(name: string): string {
        const [type, data] = name.split('-'); //experience-role  -> experience role

        if (data == undefined) return userData[name];
        else return userTypedData[type][data];
    }

    function setInputValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-'); //experience-role -> experience role
        if (data == undefined) {
            setUserData({ ...userData, [name]: value });
            setUserTypedData({ ...userTypedData, [name]: value });
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

    const checkSkillData = () => {
        user.checkNewSkill(userTypedData.skill).then((res: any) => {
            if (res.status !== 200) {
                dispatchError(formatErrors(res.data.message));
                return;
            }
            setUserData({
                ...userData,
                skills: [...userData.skills, userTypedData.skill],
            });
            setUserTypedData({
                ...userTypedData,
                skill: new Iskill(),
            });

            return flipModal('skill');
        });
    };

    const checkExperienceData = () => {
        user.checkNewExperience(userTypedData.experience).then((res: any) => {
            if (res.status !== 200) {
                return dispatchError(formatErrors(res.data.message));
            }

            setUserData({
                ...userData,
                experiences: [...userData.experiences, userTypedData.experience],
            });
            setUserTypedData({
                ...userTypedData,
                experience: new Iexperience(),
            });

            return flipModal('experience');
        });
    };

    const checkFormationData = () => {
        user.checkNewFormation(userTypedData.formation).then((res: any) => {
            if (res.status !== 200) {
                return dispatchError(formatErrors(res.data.message));
            }
            setUserData({
                ...userData,
                formations: [...userData.formations, userTypedData.formation],
            });
            setUserTypedData({
                ...userTypedData,
                formation: new Iformation(),
            });

            return flipModal('formation');
        });
    };

    function excludeFromUser(property: string, id: number): void {
        if (!canExclude[property as keyof UserCanExclude]) return;
        const data: Array<Iskill | Iexperience | Iformation> = userData[property as keyof IUserData];
        if (data == undefined) return;
        data.splice(id, 1);
        setUserData({ ...userData, [property]: data });
    }

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
                                        userData.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'
                                    }
                                    alt="Foto de perfil"
                                    className="rounded-full border-4 border-lively-purple absolute left-0 -top-20 bg-white"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="font-medium mt-24 text-lg">
                                    <div className="flex items-center text-dark-purple">
                                        <FontAwesomeIcon className="mr-2" icon={faPencil} />
                                        <h1 className="text-xl font-medium">Editar</h1>
                                    </div>
                                    <div className="text-sm md:text-md text-dark-gray font-medium">
                                        <span className="mr-1">Usuário @{userData.username}, desde</span>
                                        {new Date(userData.createdAt).toLocaleDateString('pt-BR')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 mx-5 font-medium">
                            <div className="text-xl text-dark-purple">Informações do Usuário</div>
                            <div>
                                <div className="w-full md:flex justify-between">
                                    <TextInput
                                        size="large"
                                        placeholder="Nome"
                                        type={InputTypesEnum.text}
                                        name="name"
                                        id="userName"
                                        consultPackage={consultPackage}
                                    />
                                    <TextInput
                                        size="medium"
                                        placeholder="Cargo"
                                        type={InputTypesEnum.text}
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
                    <section className="px-5 my-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">Habilidades</div>
                            <div>
                                <button
                                    onClick={() => flipExclude('skills')}
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-red-dark ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={canExclude.skills ? faTrashArrowUp : faTrash} />
                                </button>
                                <button
                                    onClick={() => flipModal('skill')}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {modalIsOpen.skill && (
                                    <FormModal
                                        handleClose={() => flipModal('skill')}
                                        handleConfirm={checkSkillData}
                                        title="Adicionar Habilidade"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Nome"
                                                name="skill-name"
                                                limit={30}
                                                id="name"
                                                consultPackage={consultPackage}
                                            />
                                            <RadioInput
                                                name="skill-level"
                                                id="level"
                                                labelClass="text-lg"
                                                options={['Iniciante', 'Intermediário', 'Avançado']}
                                                consultPackage={consultPackage}
                                            />
                                        </div>
                                    </FormModal>
                                )}
                            </div>
                        </div>
                        {!userData.skills.length && <div>Você não tem Habilidades cadastradas</div>}
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {userData.skills.map((card, key) => (
                                <UserSkillCard
                                    key={key}
                                    card={card}
                                    canExclude={canExclude.skills}
                                    exclude={() => excludeFromUser('skills', key)}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="px-5 mt-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">Experiência Profissional</div>
                            <div>
                                <button
                                    onClick={() => flipExclude('experiences')}
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-red-dark ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={canExclude.experiences ? faTrashArrowUp : faTrash} />
                                </button>
                                <button
                                    onClick={() => flipModal('experience')}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {modalIsOpen.experience && (
                                    <FormModal
                                        handleClose={() => flipModal('experience')}
                                        handleConfirm={checkExperienceData}
                                        title="Adicionar Experiência Prévia"
                                    >
                                        <div className="my-2">
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Nome"
                                                name="experience-role"
                                                limit={30}
                                                id="experience-role"
                                                consultPackage={consultPackage}
                                            />
                                            <TextInput
                                                type={InputTypesEnum.text}
                                                placeholder="Empresa"
                                                name="experience-company"
                                                limit={30}
                                                id="experience-company"
                                                consultPackage={consultPackage}
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
                        {!userData.experiences.length && <div>Você não tem Experiências cadastradas</div>}
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {userData.experiences.map((card, key) => (
                                <UserExperienceCard
                                    key={key}
                                    card={card}
                                    canExclude={canExclude.experiences}
                                    exclude={() => excludeFromUser('experiences', key)}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="px-5 my-10">
                        <div className="mt-24 md:my-4 flex justify-between items-center w-full mb-2">
                            <div className="font-medium md:text-xl text-dark-purple">Formação Acadêmica</div>
                            <div>
                                <button
                                    onClick={() => flipExclude('formations')}
                                    className="bg-red w-10 h-10 mr-2 rounded-md text-white hover:bg-red-dark ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={canExclude.formations ? faTrashArrowUp : faTrash} />
                                </button>
                                <button
                                    onClick={() => flipModal('formation')}
                                    className="bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                {modalIsOpen.formation && (
                                    <FormModal
                                        handleClose={() => flipModal('formation')}
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
                                                limit={65}
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
                                                    min={1900}
                                                    max={new Date().getFullYear()}
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
                                                    min={1900}
                                                    max={new Date().getFullYear()}
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
                        {!userData.formations.length && <div>Você não tem Formações cadastradas</div>}
                        <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {userData.formations.map((card, key) => (
                                <UserExperienceCard
                                    key={key}
                                    card={card}
                                    canExclude={canExclude.formations}
                                    exclude={() => excludeFromUser('formations', key)}
                                />
                            ))}
                        </div>
                    </section>
                    <div className="md:flex jusify-between items-center px-5">
                        <div className="md:w-4/12">
                            <FormButton
                                isDanger={true}
                                text="Excluir Conta"
                                isFullWidth={true}
                                handleClick={() => flipModal('delete')}
                            />
                        </div>
                        <div className="md:ml-3 my-5 flex justify-between md:justify-end w-full">
                            <div className="mr-2">
                                <FormButton isDanger={true} text="Cancelar" handleClick={() => flipModal('exit')} />
                            </div>
                            <FormButton text="Salvar" handleClick={() => flipModal('save')} />
                        </div>
                    </div>
                    {modalIsOpen.exit && (
                        <ConfirmationModal
                            title="Sair da Edição"
                            text="Os dados editados ainda não foram salvos. Você realmente deseja sair da edição?"
                            handleClose={() => flipModal('exit')}
                            handleConfirm={returnToUserPage}
                        />
                    )}
                    {modalIsOpen.save && (
                        <ConfirmationModal
                            title="Salvar os dados"
                            text="Você realmente deseja salvar estas modificações?"
                            handleClose={() => flipModal('save')}
                            handleConfirm={updateUserData}
                        />
                    )}
                    {modalIsOpen.delete && (
                        <ConfirmationModal
                            title="Excluir conta"
                            text="Você realmente deseja excluir sua conta? Esta ação não poderá ser desfeita."
                            handleClose={() => flipModal('delete')}
                            handleConfirm={user.deleteAccount}
                        />
                    )}
                </div>
            )}
        </UserDefault>
    );
};

export default UserEditData;
