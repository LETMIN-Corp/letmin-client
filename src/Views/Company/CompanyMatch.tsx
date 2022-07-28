import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
    });

    return (
        <CompanyDefault>
            <div className='p-5 w-full h-screen'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-user-check mr-2"></i>
                    <span>Combinações</span>
                </h1>
                <div className='lg:flex h-2/3 justify-around mt-5'>
                    <div className='lg:flex lg:items-center w-full lg:w-1/3'>
                        <div className='rounded-xl bg-gray px-3 py-4 h-80 w-full'>
                        </div>
                    </div>
                    <div className='lg:flex lg:items-center mt-10 lg:mt-0'>
                        <div>
                            <div className='text-center mb-10 lg:mb-20 '>
                                <h2 className='lg:text-5xl md:text-4xl text-3xl mb-4'>Combinação</h2>
                                <h2 className='lg:text-5xl md:text-4xl text-3xl'>Perfeita!</h2>
                            </div>
                            <div className='flex items-center justify-evenly lg:justify-between'>
                                <div>
                                    <button className='bg-primary py-2 px-4 w-30 h-10 rounded-full text-white hover:bg-dark-purple ease-out duration-200'>
                                    <span>Ver perfil</span>
                                    </button>
                                </div>
                                <div>
                                    <button className='bg-primary py-2 px-4 w-30 h-10 rounded-full text-white hover:bg-dark-purple ease-out duration-200'>
                                    <span>Próximo</span>
                                    </button>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyMatch;
