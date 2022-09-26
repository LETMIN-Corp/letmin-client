import { useEffect, useState } from 'react';
import UserProfileCard from '../../Components/Cards/UserProfileCard';
import UserExperienceCard from '../../Components/Cards/UserExperienceCard';
import InfoModal from '../../Components/Modals/InfoModal';
import UserDefault from './UserDefault'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useUser from '../../Utils/useUser';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';

const UserProfile : React.FC = () => {
    const { loading } = useLoading();
    const user = useUser();

    const [userData, setUserData] = useState({
        createdAt: '',
        email: '',
        name: '',
        picture: '',
        formations: [],
        experiences: [],
    });

    useEffect((): void => {
        user.getUserData().then((res : any) => {
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

    interface XPInterface {
        [key: number] : {
            name: string;
            institution: string;
            start:string;
            finish:string;
            description: string;
        }
        [Symbol.iterator] : () => IterableIterator<{
            name: string;
            institution: string;
            start:string;
            finish:string;
            description: string;
        }>;
        length: number;

        filter(arg0: (experience: { title: string; }) => boolean): import("react").SetStateAction<XPInterface>;
    }
    const [searchExperiences, setSearchExperiences] = useState('');
    const [allExperiences, setAllExperiences] = useState<XPInterface>([]);
    const [experiences, setExperiences] = useState<XPInterface>([]);

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
            start:string;
            finish:string;
            description: string;
        }
        [Symbol.iterator] : () => IterableIterator<{
            name: string;
            institution: string;
            start:string;
            finish:string;
            description: string;
        }>;
        length: number;

        filter(arg0: (experience: { title: string; }) => boolean): import("react").SetStateAction<FormationInterface>;
    }
    const [searchFormations, setSearchFormations] = useState('');

    const filterFormations = (value : string) => {
        if(value.length === 0) {
            return;
        }
    }

    return (
        <UserDefault>
            {
                loading ? <Loading /> : (
                    <div className='min-h-90'>
                        <main>
                            <div className='h-32 bg-lively-purple'></div>
                            <div className='relative flex md:justify-end mx-5'>
                                <img src={ userData.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'} className='rounded-full border-4 border-lively-purple absolute left-0 -top-20' referrerPolicy='no-referrer' />
                                <div className='mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full'>
                                    <Link to={'/user/profile/edit'} className='text-center xl:text-lg lg:text-md text-sm rounded-md text-white py-2 px-5 bg-bright-purple drop-shadow-lg hover:bg-bold-purple'>
                                        Editar Dados
                                        <FontAwesomeIcon icon={ faPencil } className='ml-2' />
                                    </Link>
                                </div>
                            </div>
                            <div className='mt-5 md:mt-10 mx-5'>
                                <div className='font-medium text-xl text-dark-purple'>{ userData.name || 'Nome do Usuário' }</div>
                                <div className='text-lg text-justify'>Programador WEB!</div>
                            </div>
                        </main>
                        <section className='px-5 mt-10'>
                            <div className='font-medium text-xl text-dark-purple'>Quem Sou Eu?</div>
                            <div className='text-lg text-justify'>Uma pessoa que gosta muito de aprender e é muito próxima da tecnologia! Sou um desenvolver WEB backend, no qual trabalho mais com NODE e PHP</div>
                        </section>
                        <section className='px-5 mt-10'>
                            <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...userData.experiences,
                                    ].map((card, key) => <UserExperienceCard key={ key } card={ card } /> )
                                }
                            </div>
                        </section>
                        <section className='px-5 my-10'>
                            <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...userData.formations,
                                    ].map((card, key) => <UserExperienceCard key={ key } card={ card } /> )
                                }
                            </div>
                        </section>
                        {
                            openModal && (
                                <InfoModal title='Informações' handleClose={ () => setOpenModal(false) } >
                                    <span className='text-justify'>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos nemo nulla soluta rem maxime perferendis laborum quia fugiat, inventore minus nisi incidunt doloremque id impedit necessitatibus hic voluptas expedita. Nemo!
                                    </span>
                                </InfoModal>
                            )
                        }
                    </div>
                )
            }
        </UserDefault>
    );
}

export default UserProfile;
