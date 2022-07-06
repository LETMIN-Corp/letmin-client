import CompanyDefault from './CompanyDefault';
import { useEffect, useState  } from 'react';
import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';

const CompanyTalentSearch = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Talentos';
    });

    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span> Buscar Talentos</span>
                </h1>

                <div className='mt-5'>
                    <input type='text' placeholder='Buscar' className='max-w-sm w-full px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                </div>          

                <div className='mt-7'>
                    <p className='text-bright-gray font-bold text-sm md:text-md text-md mb-2'>Aproximadamente 12.300 resultados</p>
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
                        ].map((card, key) => <CompanyTalentSearchCard card={ card } key={ key } />)
                    }
                </div>

                <div className='flex justify-center w-full my-10 mr-40'>                    
                    <button className='bg-bright-purple text-white text-center w-16 py-2 md:mx-3 mx-1 drop-shadow-lg lg:text-md text-sm hover:bg-bold-purple rounded-sm'>1</button> 
                    <button className='bg-bright-purple text-white text-center w-16 py-2 md:mx-3 mx-1 drop-shadow-lg lg:text-md text-sm hover:bg-bold-purple rounded-sm'>2</button> 
                    <button className='text-bright-purple text-3xl text-center w-11 py-2 md:mx-3 mx-1'>...</button> 
                    <button className='bg-bright-purple text-white text-center w-16 py-2 md:mx-3 mx-1 drop-shadow-lg lg:text-md text-sm hover:bg-bold-purple rounded-sm'>10</button>
                </div>

            </div>
        </CompanyDefault>
    );
}

export default CompanyTalentSearch;
