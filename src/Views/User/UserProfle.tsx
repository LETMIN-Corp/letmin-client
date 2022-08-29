import { useEffect, useState, useContext } from 'react';
import UserProfileCard from '../../Components/Cards/UserProfileCard';
import InfoModal from '../../Components/Modals/InfoModal';
import UserDefault from './UserDefault'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faLink } from '@fortawesome/free-solid-svg-icons';

const UserProfile : React.FC = () => {
    const { isAuthenticated, userData, signOut }:any = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Perfil';
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <UserDefault>
            <div className='min-h-90'>
            <main>
                <div className='h-32 bg-lively-purple'></div>
                    <div className='relative flex md:justify-end mx-5'>
                        <img src='https://via.placeholder.com/150' className='rounded-full border-4 border-lively-purple absolute left-0 -top-20' />
                        <div className='mt-24 md:mt-5 text-lg md:justify-end flex justify-between items-center w-full'>
                            <a href='#' className='font-medium text-dark-purple hover:text-lively-purple'>
                                <i className='fa-solid fa-link mr-2'></i>
                                <span>Link Externo</span>
                            </a>
                            <button onClick={ () => setOpenModal(true) } className='text-white bg-dark-purple w-8 h-8 rounded-full ml-2'>
                                <i className="fa-solid fa-info"></i>
                            </button>
                        </div>
                    </div>
                    <div className='mt-5 md:mt-10 mx-5'>
                        <div className='font-medium text-xl text-dark-purple'>Nome do Usuário</div>
                        <div className='text-lg text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
                    </div>
                </main>
                <section className='px-5 mt-10'>
                    <div className='font-medium text-xl text-dark-purple'>Quem Sou Eu?</div>
                    <div className='text-lg text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore reiciendis nobis tempora eos quo unde dolores perspiciatis ut id sapiente molestiae vero eligendi ullam quibusdam libero, tempore in fugit!</div>
                </section>
                <section className='px-5 mt-10'>
                    <div className='font-medium text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <div className='font-medium text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
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
        </UserDefault>
    );
}

export default UserProfile;
