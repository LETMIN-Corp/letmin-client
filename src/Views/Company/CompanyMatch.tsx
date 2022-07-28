import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
    });

    return (
        <CompanyDefault>
            <div className='p-5 h-screen fixed'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-user-check mr-2"></i>
                    <span>Combinações</span>
                </h1>
                <div className='flex h-2/3 justify-around mt-5'>
                    <div className='flex items-center w-1/3'>
                        <div className='rounded-xl bg-gray px-3 py-4 lg:h-80'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi necessitatibus numquam, officiis ab culpa accusamus consectetur ad voluptatum, voluptates odio vero! Accusamus deleniti molestiae possimus quas et error ducimus architecto.</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <div className='text-center mb-20'>
                                <h2 className='text-5xl mb-4'>Combinação</h2>
                                <h2 className='text-5xl'>Perfeita!</h2>
                            </div>
                            <div className='flex items-center justify-between'>
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
