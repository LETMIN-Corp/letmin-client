import HighLight from '../../Components/Items/HighLight';
import { useEffect, useState } from 'react';
import CompanyDefault from './CompanyDefault';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHeart, faLeftLong, faRightLong, faTrash } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';

const CompanyCombinations : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinação';
    }, []);

    const company = useCompany();
    const params = useParams();

    const [userInTalentBank, setUserInTalentBank] = useState(false);

    useEffect((): void => {
        company.getCompanyData().then((company : any) => {
            setUserInTalentBank(company.data.data.talentBank.includes(params.id));
        });
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
                            <FontAwesomeIcon icon={ faBriefcase } className='border-4 border-primary rounded-full px-2 py-2 cursor-pointer text-primary text-3xl' />
                            {
                                ! userInTalentBank && (
                                    <FontAwesomeIcon icon={ faHeart }
                                        onClick={ () => company.addToTalentBank(params.id) }
                                        className='ml-3 border-4 border-primary rounded-full px-2 py-2 cursor-pointer text-primary text-3xl'
                                    />
                                )
                            }
                            {
                                userInTalentBank && (
                                    <FontAwesomeIcon icon={ faTrash }
                                        onClick={ () => company.removeFromTalentBank(params.id) }
                                        className='ml-3 border-4 border-red rounded-full px-2 py-2 cursor-pointer text-red text-3xl'
                                    />
                                )
                            }
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
        </CompanyDefault> 
    );
}

export default CompanyCombinations;
