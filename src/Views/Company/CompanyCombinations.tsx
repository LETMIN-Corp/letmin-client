import HighLight from '../../Components/Items/HighLight';
import { useEffect } from 'react';
import CompanyDefault from './CompanyDefault';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHeart, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';

const CompanyCombinations : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinação';
    }, []);

    return (
        <CompanyDefault>
            <div className='flex justify-center items-center py-5 lg:py-10 bg-primary'>
                <h1 className='text-white text-4xl lg:text-5xl font-black mt-4'>Combinação</h1>
            </div>
            <div className='p-5'>
                <section className='flex flex-col justify-center items-center py-10'>
                    <section className='flex flex-row justify-between w-full lg:w-8/12 items-center pb-10 md:py-10'>
                        <Link to='/company/combinations/'>
                            <span className='flex items-center text-dark-purple cursor-pointer'>
                                <span className='rounded-full w-1 h-6 bg-dark-purple mr-1'></span>
                                <FontAwesomeIcon icon={ faLeftLong } className='text-dark-purple text-4xl' />
                            </span>
                        </Link>
                        <FontAwesomeIcon icon={ faRightLong } className='text-dark-purple text-4xl cursor-pointer' />
                    </section>
                    <div className='w-full flex items-center justify-between lg:w-8/12'>
                        <div>
                            <img src='https://via.placeholder.com/150' className='rounded-md' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={ faBriefcase } className='border-4 border-primary rounded-full px-2 py-1 cursor-pointer text-primary text-3xl' />
                            <FontAwesomeIcon icon={ faHeart } className='ml-3 border-4 border-primary rounded-full px-2 py-1 cursor-pointer text-primary text-3xl' />
                        </div>
                    </div>
                </section>
                <section className='flex w-full lg:w-8/12 mx-auto flex-wrap md:text-left'>
                    <h2 className='w-full text-dark-purple font-bold text-3xl mb-5'>Candidato X</h2>
                    <div className='md:w-6/12'>
                        <div className='md:pr-4'>
                            <h4 className='text-xl font-bold text-dark-purple'>Habilidades extras:</h4>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </p>
                        </div>
                        <div className='md:pr-4'>
                            <h4 className='text-xl font-bold text-dark-purple'>Observações:</h4>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div className='md:w-6/12'>
                        <div className='md:pr-4'>
                            <h4 className='text-xl font-bold text-dark-purple'>Pontos de atenção:</h4>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                            </p>
                        </div>
                        <div className='md:pr-4'>
                        <h4 className='text-xl font-bold text-dark-purple'>Média empregado:</h4>
                        <p>
                            Há mais de <HighLight>2 anos</HighLight>
                        </p>
                        </div>
                    </div>
                </section>
                <section className='w-full lg:w-8/12 mx-auto py-10'>
                        <h2 className='text-3xl text-dark-purple md:text-left font-bold mb-4'>Portfólio</h2>
                        <p className='text-lg md:text-xl text-justify md:w-10/12 lg:w-8/12 my-6'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat
                        </p>
                </section>
            </div>
            {/* <section className='flex flex-col justify-center items-center bg-primary p-5'>
                <h2 className='text-2xl lg:text-4xl text-white text-center pt-9 font-bold'>
                    Entre em contato com o candidato
                </h2>
                <div className='mt-10 flex flex-wrap justify-around'>
                    {
                        [
                            {
                                text: 'Entrevista',
                            },
                            {
                                text: 'Aprovar',
                            },
                            {
                                text: 'Reprovar',
                            },
                        ].map((button, key) => {
                            return (
                                <div className='m-4 '>
                                    <FormButton text={ button.text } handleClick={ () => {} } key={ key } />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex flex-col justify-center items-center py-10'>
                    <div className='flex mr-auto bg-white rounded-t-md px-10 py-1 text-primary font-bold'>
                        Email
                    </div>
                    <div className='text-lg md:text-xl text-justify p-6 bg-white rounded-b-md rounded-tr-md'>
                        <textarea rows={ 5 } cols={ 60 } className='w-full resize-none p-2 outline-none text-lg md:text-xl text-justify pb-10' name='comment' id='comment' placeholder='Digite aqui seu email'></textarea>
                        <div className='flex justify-end mt-2'>
                            <FormButton text='Enviar'  handleClick={ () => {} }/>
                        </div>
                    </div>    
                </div>
            </section> */}
        </CompanyDefault> 
    );
}

export default CompanyCombinations;
