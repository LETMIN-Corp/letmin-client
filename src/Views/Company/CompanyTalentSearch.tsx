import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';
import List from '../../Components/Items/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CompanyTalentSearch = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Talentos';
    }, []);

    const data = [
        {
            id: 1,
            name: 'Nome 1',
            profission: 'Profissão',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 2,
            name: 'Nome 2',
            profission: 'Profissão',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 3,
            name: 'Nome 3',
            profission: 'Profissão',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 4,
            name: 'Nome 4',
            profission: 'Profissão',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
        {
            id: 5,
            name: 'Nome 5',
            profission: 'Profissão',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
        },
    ].map((card, key) => <CompanyTalentSearchCard card={ card } key={ key } />);

    return (
        <CompanyDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faLightbulb } className='mr-2' />
                    <span> Buscar Talentos</span>
                </h1>

                <div className='mt-5'>
                    <div className='max-w-sm w-full relative'>
                        <input type='text' placeholder='Buscar' className='w-full mr-3 pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                    </div>
                </div>
                {
                    !!data.length && (
                        <div className='mt-7'>
                            <p className='text-bright-gray font-bold text-sm md:text-md text-md mb-2'>Foram encontrados { data.length } resultados</p>
                        </div>
                    )
                }
                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5'>
                    <List data={ data } itemsPerPage={ 10 }></List>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyTalentSearch;
