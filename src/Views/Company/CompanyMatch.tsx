import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
<<<<<<< Updated upstream
import SecondaryLink from '../../Components/Links/SecondaryLink';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Combinacoes';
=======

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
>>>>>>> Stashed changes
    });

    return (
        <CompanyDefault>
<<<<<<< Updated upstream
            <div className="p-5">
                <h1 className='text-2xl'> Combinações </h1>
                <div className='flex justify-between'>
                    <div>
                        <div className='bg-gray rounded-md'>
                            bdfyuasyfugdsygdfyu
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='text-3xl font-bold text-center'>
                            Combinação Perfeita!
                        </div>
                        <div className='flex justify-between mt-8'>
                            <SecondaryLink path='/' text='Ver Perfil' />
                            <SecondaryLink path='/' text='Próximo' />
                        </div>
=======
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
>>>>>>> Stashed changes
                    </div>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyMatch;
