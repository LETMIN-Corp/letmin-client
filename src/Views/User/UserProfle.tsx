import { faPencil, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import UserSkillCard from '../../Components/Cards/UserSkillsCard';
import Loading from '../../Components/Items/Loading';
import { Iexperience, Iformation, Iskill, IUserData } from '../../Interfaces/UserInterfaces';
import { dispatchError } from '../../Utils/ToastMessages';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

const UserProfile: React.FC = () => {
    const { loading } = useLoading();
    const user = useUser();

    const [userData, setUserData] = useState<IUserData>(new IUserData());

    useEffect((): void => {
        user.getUserData().then((res: any) => {
            if (res.status != 200) {
                dispatchError('Não foi possível carregar seus dados.');
            }

            setUserData(res.data.user);
        });
        window.document.title = 'Letmin - Perfil';
    }, []);

    return (
        <UserDefault>
            {loading ? (
                <Loading />
            ) : (
                <div className="min-h-90">
                    <main>
                        <div className="h-32 bg-lively-purple"></div>
                        <div className="relative flex md:justify-end mx-5">
                            <img
                                src={userData.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'}
                                className="rounded-full bg-white border-4 border-lively-purple absolute left-0 -top-20"
                                referrerPolicy="no-referrer"
                                alt="Foto de perfil"
                            />
                            <div className="mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full">
                                <Link
                                    to={'/user/profile/edit'}
                                    className="text-center xl:text-lg lg:text-md text-sm rounded-md text-white py-2 px-5 bg-bright-purple drop-shadow-lg hover:bg-bold-purple"
                                >
                                    Editar Dados
                                    <FontAwesomeIcon icon={faPencil} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-10 mb-5 mx-5">
                            <div className="font-bold text-2xl text-dark-purple">
                                {userData.name || 'Nome do Usuário'}
                            </div>
                            <div className="text-sm text-dark-purple">@{userData.username}</div>
                            <div className="text-lg text-justify text-dark-gray">{userData.role}</div>
                        </div>
                    </main>
                    {!userData.description &&
                        !userData.experiences.length &&
                        !userData.formations.length &&
                        !userData.skills.length && (
                            <div className="px-5 h-80 flex flex-col items-center drop-shadow-md justify-center text-primary font-bold text-2xl">
                                <FontAwesomeIcon icon={faWarning} className="mr-2 text-5xl" />
                                <span className="text-center w-10/12 md:w-6/12 lg:w-4/12 mt-1">
                                    Você ainda não tem dados cadastrados!
                                </span>
                            </div>
                        )}
                    {userData.description && (
                        <section className="px-5 mb-5">
                            <div className="font-medium text-xl text-dark-purple">Descrição</div>
                            <div className="text-lg text-justify">{userData.description}</div>
                        </section>
                    )}
                    {!!userData.skills.length && (
                        <section className="px-5 mb-5">
                            <div className="font-medium text-xl text-dark-purple">Habilidades</div>
                            <div className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {userData.skills.map((card: Iskill, index: number) => (
                                    <UserSkillCard key={index} card={card} />
                                ))}
                            </div>
                        </section>
                    )}
                    {!!userData.experiences.length && (
                        <section className="px-5 mb-5">
                            <div className="font-medium text-xl text-dark-purple mb-2">Experiências Profissionais</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {userData.experiences.map((card: Iexperience, key) => (
                                    <UserExperienceCard key={key} card={card} />
                                ))}
                            </div>
                        </section>
                    )}
                    {!!userData.formations.length && (
                        <section className="px-5 mb-5">
                            <div className="font-medium text-xl text-dark-purple mb-2">Formação Acadêmica</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {userData.formations.map((card: Iformation, key) => (
                                    <UserExperienceCard key={key} card={card} />
                                ))}
                            </div>
                        </section>
                    )}
                    <div className="px-5 text-sm md:text-md text-dark-gray font-medium">
                        <span className="mr-1">Usuário @{userData.username}, desde</span>
                        {new Date(userData.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                </div>
            )}
        </UserDefault>
    );
};

export default UserProfile;
