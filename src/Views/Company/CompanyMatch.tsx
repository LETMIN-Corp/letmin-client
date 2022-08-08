import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
    });

    return (
        <CompanyDefault>
            <div className='p-5 w-full min-h-80'>
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
                            <div className='sm:flex lg:w-80 items-center justify-evenly lg:justify-between'>
                                <div className='flex w-full justify-center'>
                                    <SecondaryLink text='Ver Perfil' path='/company/combinations/1'></SecondaryLink>
                                </div>
                                <div className='flex w-full justify-center mt-5 sm:mt-0'>
                                    <SecondaryButton text='Próximo' handleClick={ () => {} }></SecondaryButton>
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
