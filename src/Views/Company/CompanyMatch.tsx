import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Combine from '../../Assets/combine.gif';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
    });

    return (
        <CompanyDefault>
            <div className='p-5 w-full min-h-80'>
                <h1 className='text-2xl text-dark-purple font-medium'>
                    <FontAwesomeIcon icon={ faUserCheck } className='mr-2' />
                    <span>Combinações</span>
                </h1>
                <div className='xl:flex h-2/3 justify-around mt-5'>
                    <div className='xl:flex xl:items-center w-full xl:w-1/3'>
                        <div className='px-3 py-4 w-full'>
                            <img src={ Combine } className='md:h-80 lg:h-full m-auto' />
                            <div className='font-bold text-dark-purple text-lg'>
                                Pedro Antonio da Silva
                            </div>
                            <div className='font-medium lg:text-lg text-justify'>
                                Sou um Designer de Interiores, que estagiou durante o ano de 2018 na empresa INSIDE - Arquitetura e Design de Interiores na cidade de São Paulo. Meus projetos se baseiam no estilo gregoriano moderno, onde mesclo tradição e história com tecnologia e inovação.
                            </div>
                        </div>
                    </div>
                    <div className='xl:flex xl:items-center mt-10 lg:mt-0'>
                        <div>
                            <div className='text-center mb-10 lg:mb-20 font-bold text-dark-purple'>
                                <h2 className='lg:text-5xl md:text-4xl text-3xl mb-4'>Combinação</h2>
                                <h2 className='lg:text-5xl md:text-4xl text-3xl'>Perfeita!</h2>
                            </div>
                            <div className='sm:flex xl:w-80 items-center justify-evenly lg:justify-between'>
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
