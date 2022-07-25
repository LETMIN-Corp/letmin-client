import { useEffect, useState  } from 'react';
import UserVacancySearchCard from '../../Components/Cards/UserVacancySearchCard';
import List from '../../Components/Items/List';
import InfoModal from '../../Components/Modals/InfoModal';
import UserDefault from './UserDefault'

const CompanyTalentSearch = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';
    }, []);

    const data = [
        {
            id: 1,
            name: 'Vaga 1',
            function: 'Função',
            location: 'Localização',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 2,
            name: 'Vaga 2',
            function: 'Função',
            location: 'Localização',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 3,
            name: 'Vaga 3',
            function: 'Função',
            location: 'Localização',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 4,
            name: 'Vaga 4',
            function: 'Função',
            location: 'Localização',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 5,
            name: 'Vaga 5',
            function: 'Função',
            location: 'Localização',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
    ].map((card, key) => <UserVacancySearchCard card={ card } key={ key } />);

    return (
        <UserDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-bullhorn mr-2"></i>
                    <span> Buscar Vagas</span>
                </h1>

                <div className='mt-5 flex flex-wrap'>
                    <div className='max-w-sm w-full relative'>
                        <input type='text' placeholder='Buscar' className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <i className='fa-solid fa-magnifying-glass absolute right-2 top-1 text-xl text-dark-purple'></i>
                    </div>
                    <div className='w-full md:w-auto flex mt-2 lg:mt-0 lg:ml-5'>
                        <select name='' id='' className='w-full px-2 py-1.5 border-2 border-dark-purple rounded-md'>
                            <option value='opcao1'>Opção 1</option>
                            <option value='opcao2'>Opção 2</option>
                            <option value='opcao3'>Opção 3</option>
                        </select>
                        <select name='' id='' className='w-full px-2 py-1.5 ml-5 border-2 border-dark-purple rounded-md'>
                            <option value='opcao1'>Opção 1</option>
                            <option value='opcao2'>Opção 2</option>
                            <option value='opcao3'>Opção 3</option>
                        </select>
                    </div>
                </div>          

                <div className='mt-7'>
                    <p className='text-bright-gray font-bold text-sm md:text-md text-md mb-2'>Aproximadamente { data.length } resultados</p>
                </div>

                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5'>
                    <List data={ data } itemsPerPage={ 10 }></List>
                </div>
            </div>
        </UserDefault>
    );
}

export default CompanyTalentSearch;
