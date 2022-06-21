import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';
import { Link } from 'react-router-dom';

const CompanyIndicators = () => {
    useEffect((): void => {
        window.document.title = 'Indicadores';
    });

const viewConsultPackage = {
    getValue: () : string => { return '' },
    setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
}

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span> Buscar Talentos</span>
                </h1>

                <div className='w-3/12 border-2 border-dark-purple rounded-lg flex items-center justify-between mt-5 pr-5'>
                    <input placeholder='  Pesquisar' className='w-11/12 px-2 py-1' type='text' name='search' ></input> 
                    <Link to={ '/company/search' }><i className="fa-solid fa-magnifying-glass"></i></Link>
                
                </div>

                

                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-10 w-full  my-6 md:my-10'>
                    {
                        [
                            {
                                icon: 'fa-solid fa-user',
                                name: 'Nome 1',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '',
                            },
                            {
                                icon: 'fa-solid fa-building',
                                name: 'Nome 2',
                                profission: 'Profissão',
                                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias fugit ut quas numquam, consectetur delectus soluta fuga eos, non quisquam mollitia hic, libero quo voluptates sit!',
                                text: 'Ver Perfil',
                                path: '/register/company',
                            },
                        ].map((card) => <CompanyTalentSearchCard card={ card } key={ card.path } />)
                    }
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyIndicators;
