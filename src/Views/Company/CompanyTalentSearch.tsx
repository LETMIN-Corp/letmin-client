import CompanyDefault from './CompanyDefault';
import { useEffect, useState  } from 'react';
import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';
import { Link } from 'react-router-dom';
import FormButton from '../../Components/Buttons/FormButton';
import { useNavigate } from 'react-router-dom';

const CompanyTalentSearch = () => {
    useEffect((): void => {
        window.document.title = 'Busca de Talentos';
    });

    const navigate = useNavigate();

    const cont = 0;

    const pageButtons = [
        {
            text: 'Voltar para o cadastro',
            path: '/register',
            isLink: true,
            hasFunction: true,
            handleClick: () => setModalIsOpen(true),
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [termIsAccepted, setTermIsAccepted] = useState(true);
    const [registerData, setRegisterData] = useState<IRegisterData>({
    });

    interface IRegisterData {
        [key: string]: {
            [key: string]: string;
        };
    }

    function handleRegister() {
        // Lógica de cadastro e validação de dados

        navigate('/company/indicators');
    }

    const pageConstraints = {
        min: 0,
        max: 3,
    }

    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span> Buscar Talentos</span>
                </h1>

                <div className='flex justify-between w-full mt-5 items-center '>
                {/* <input onChange={ (e) => setSearchFolders(e.target.value) } type='text' placeholder='Buscar' className='max-w-sm w-full mr-3 px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' /> */}
                    <input type='text' placeholder='Buscar' className='max-w-sm w-full px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                    <Link to='/company/favorite'><i className="fa-regular fa-heart fa-2x mr-5"></i></Link>
                </div>          
                
                <div className='mt-7'>
                    <p className='text-bright-gray font-bold text-lg'>Aproximadamente 12.300 resultados</p>
                </div>

                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5'>
                    {
                        [
                            {
                                icon: 'fa-solid fa-user',
                                name: 'Nome 1',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/company/userprofile',
                            },
                            {
                                icon: 'fa-solid fa-building',
                                name: 'Nome 2',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/company/userprofile',
                            },
                            {
                                icon: 'fa-solid fa-building',
                                name: 'Nome 3',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/company/userprofile',
                            },
                            {
                                icon: 'fa-solid fa-building',
                                name: 'Nome 2',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/company/userprofile',
                            },
                            {
                                icon: 'fa-solid fa-building',
                                name: 'Nome 3',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/company/userprofile',
                            },
                        ].map((card) => <CompanyTalentSearchCard card={ card } key={ card.path } />)
                    }
                </div>

                <div className='flex justify-center w-full my-10 mr-40'>                    
                    {
                        (currentPage > pageConstraints.min) && (
                            <button className='bg-bright-purple text-white text-center w-32 py-2 mx-5 rounded-full drop-shadow-lg md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage - 1) }>Voltar</button> 
                        ) 
                    }
 
                    <button className='bg-bright-purple text-white text-center w-16 py-2 mx-3 drop-shadow-lg md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage - 1) }>1</button> 
                    <button className='bg-bright-purple text-white text-center w-16 py-2 mx-3 drop-shadow-lg md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage - 1) }>2</button> 
                    <button className='bg-bright-purple text-white text-center w-11 py-2 mx-3 drop-shadow-lg rounded-full md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage - 1) }>...</button> 
                    <button className='bg-bright-purple text-white text-center w-16 py-2 mx-3 drop-shadow-lg md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage - 1) }>10</button> 
                           
                    {
                        (currentPage < pageConstraints.max) && (
                            <button className='bg-bright-purple text-white text-center w-32 py-2 mx-5 rounded-full drop-shadow-lg md:text-lg hover:bg-bold-purple' onClick={ () => setCurrentPage(currentPage + 1) }>Próximo</button> 
                        )
                    }
                </div>

            </div>
        </CompanyDefault>
    );
}

export default CompanyTalentSearch;
