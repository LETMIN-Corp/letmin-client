import Card from '../../Components/Cards/HomeCard';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import HighLight from '../../Components/Items/HighLight';
import HomeSection from '../../Components/Layouts/HomeSections';
import RegisterCard from '../../Components/Cards/RegisterCard';
import StripTitle from '../../Components/Titles/StripTitle';
import Menu from '../../Components/Layouts/Menu';
import { useEffect } from 'react';

const CompanyStatistics : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Estatísticas';
    });

    const menuButtons = [
        {
            text: 'Indicadores',
            path: '/company/indicators',
            isLink: true,
        },
        {
            text: 'Banco de Talentos',
            path: '/company/2',
            isLink: true,
        },
        {
            text: 'Combinações',
            path: '/company/3',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/statistics',
            isLink: true,
        },
        {
            text: 'Meus Dados',
            path: '/company/5',
            isLink: true,
        },
    ];

    return (
        <>
            <div className='flex'>
                <Menu menuButtons={ menuButtons } showMenu={ true } />
                <div className='w-full mt-20 p-5'>
                    <StripTitle text='Empresa - Estatisticas' />
                    <section className='flex flex-col justify-center items-center md:py-10'>
                    <SecondaryLink text='Anterior' path='/register' />
                    <SecondaryLink text='Próximo' path='/register' />
                        <div className='flex flex-col justify-center items-center md:grid-cols-2 lg:w-8/12'>
                            {
                                [
                                    {
                                        icon: 'fa-solid fa-user',
                                        title: '',
                                        text: 'Abrir separadamente',
                                        path: '',
                                    }
                                ].map((card) => <RegisterCard card={ card } key={ card.path } />)
                            }
                        </div>
                    </section>
                    <HomeSection id='who-we-are' >
                        <h2 className='text-4xl text-center text-dark-purple font-bold px-6'>Candidato X</h2>
                        <div className='flex flex-col md:flex-row px-6 md:pt-6 max-w-4xl'>
                            <p className='text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12'>
                                <HighLight>Habilidades Extras:</HighLight> Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. <br /> <br />
                                <HighLight>Pontos de Atenção:</HighLight> nos processos, para que tanto
                                a empresa quanto o candidato obtenham satisfação no uso do programa.
                            </p>
                            <div className='md:w-6/12 my-3 md:my-0 md:ml-5'></div>
                        </div>
                        <div className='flex flex-col md:flex-row px-6 md:pt-6 max-w-4xl'>
                            <div className='md:w-6/12 my-3 md:my-0 md:mr-5'></div>
                            <p className='text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12'>
                                <HighLight>Observações:</HighLight> Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. <br /> <br />
                                <HighLight>Pontuação geral:</HighLight> 666,69
                            </p>
                        </div>
                    </HomeSection>
                    <section className='flex flex-col justify-center items-center md:py-10'>
                        <div className='flex flex-col justify-center items-center md:grid-cols-2 lg:w-8/12'>
                            {
                                [
                                    {
                                        icon: 'fa-solid fa-user',
                                        title: 'Ayah do Santos',
                                        text: 'Lorem ipsum fodase dolor',
                                        path: '',
                                    }
                                ].map((card) => <RegisterCard card={ card } key={ card.path } />)
                            }
                        </div>
                    </section>
                    <HomeSection id='about'>
                        <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Média de tempo nas empresas</h2>
                        <p className='text-lg md:text-xl text-justify w-10/12 lg:w-8/12 my-6'>
                            Há mais de <HighLight>2 anos</HighLight>
                        </p>
                        <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Portfólio</h2>
                        <p className='text-lg md:text-xl text-justify w-10/12 lg:w-8/12 my-6'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat
                        </p>
                    </HomeSection>
                    <section className='flex flex-col justify-center items-center bg-bright-purple py-10'>
                        <h2 className='text-4xl text-black text-center px-6'>
                            Entre em contato com o candidato
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-1 w-10/12 lg:w-8/12 my-6 md:my-10'>
                            {
                                [
                                    {
                                        title: 'Entrevista',
                                        text: '',
                                    },
                                    {
                                        title: 'Aprovado',
                                        text: '',
                                    },
                                    {
                                        title: 'Reprovado',
                                        text: '',
                                    },
                                ].map((card, key) => <Card card={ card } key={ key } />)
                            }
                        </div>
                        <HomeSection id='about'>
                        <h2 className='text-4xl text-left text-dark-purple font-bold px-6 mb-4'>Email</h2>
                        <p className='text-lg md:text-xl text-justify w-10/12 lg:w-8/12 p-6 pb-12 my-6 bg-white'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat
                        </p>
                    </HomeSection>
                    </section>
                </div>
            </div>
        </>
    );
}

export default CompanyStatistics;
