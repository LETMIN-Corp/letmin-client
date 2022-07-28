import Menu from '../Components/Layouts/Menu';
import Footer from '../Components/Layouts/Footer';
import Card from '../Components/Cards/HomeCard';
import SecondaryLink from '../Components/Links/SecondaryLink';
import HighLight from '../Components/Items/HighLight';
import HomeSection from '../Components/Layouts/HomeSections';
import { useEffect } from 'react';
import ImgMatch from '../Assets/img-match.png';
import ImgTeam from '../Assets/img-team.png';
import ImgComemoration from "../Assets/img-comemoration.png";

import PartnerImage from '../Components/Images/PartnerImage';
import Cube from '../Assets/cube.png';
import Hearth from '../Assets/hearth.png';
import Hourglass from '../Assets/hourglass.png';
import Star from '../Assets/star.png';

const Home : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Página Inicial';
    }, []);

    const menuButtons = [
        {
            text: 'Diferencial',
            path: '#differential',
        },
        {
            text: 'Sobre',
            path: '#about',
        },
        {
            text: 'Quem somos',
            path: '#who-we-are',
        },
        {
            text: 'Cadastre-se',
            path: '/register',
            isLink: true,
        },
    ];

    return (
        <>
            <Menu menuButtons={ menuButtons } />
            <main id='main' className='min-h-90 flex flex-col md:flex-row justify-center items-center bg-primary'>
                <div className='w-8/12 md:w-6/12 text-center md:text-left mb-8'> 
                    <h1 className='text-white text-6xl md:text-8xl lg:text-9xl font-black md:w-10/12 lg:w-8/12 md:flex drop-shadow-lg'>LET ME IN</h1>
                </div>
                <div className='w-10/12 md:w-4/12 text-center md:text-left'>
                    <p className='text-white text-xl my-5 font-medium'>Uma forma rápida e fácil de gerenciar seu recrutamento</p>
                    
                    <SecondaryLink text='Cadastre-se' path='/register' />
                </div>
            </main>
            <HomeSection id='differential'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Nada parecido no mercado</h2>
                <div className='px-5 md:w-10/12 my-6 md:my-10 flex flex-wrap'>
                    <p className='lg:w-7/12 text-lg text-justify'>
                        Oferecemos um serviço <HighLight>rápido e fácil</HighLight> em sua utilização,
                        onde toda a triagem da mão de obra é feita através do aplicativo.
                        A vantagem na utilização do App é reduzir o custo e o tempo que a empresa gastaria na seleção de candidatos aptos ao cargo,
                        e fornecer <HighLight>relatórios sobre o andamento das entrevistas</HighLight> e de cada candidato.
                        A vantagem para os candidatos é a <HighLight>redução no tempo gasto em longas filas de emprego</HighLight>,
                        pois o mesmo tem condições de estar concorrendo a várias vagas de emprego ao mesmo tempo,
                        através do currículo e perfil cadastrado na aplicação.
                    </p>
                    <p className='w-full lg:w-5/12 flex justify-center mt-5 lg:mt-0 lg:justify-end'>
                        <img src={ ImgMatch } className='w-10/12 md:max-w-sm md:h-80' />
                    </p>
                </div>
            </HomeSection>
            <section className='flex flex-col justify-center items-center bg-bright-purple py-10'>
                <h2 className='text-4xl text-white text-center font-bold px-6'>
                    Contrate com <br />
                    mais eficiência
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-10/12 lg:w-8/12 my-6 md:my-10'>
                    {
                        [
                            {
                                title: 'Indicadores',
                                text: 'Gráficos que proporcionam uma consulta dinâmica e a facilitação da visualização da compatibilidade entre empresa e funcionário.',
                            },
                            {
                                title: 'Combinações',
                                text: 'Sistema de avaliação e seleção completo que combina empresa e candidato com interesses e requisitos semelhantes.',
                            },
                            {
                                title: 'Bancos de Talentos',
                                text: 'Sua empresa poderá favoritar candidatos para serem, no futuro, contratados em uma vaga mais adequada.',
                            },
                        ].map((card, key) => <Card card={ card } key={ key } />)
                    }
                </div>
            </section>
            <HomeSection id='about'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Sobre</h2>
                <p className='text-lg md:text-xl text-justify w-10/12 lg:w-8/12 my-6'>
                    A  <HighLight>LETMIN</HighLight> é um serviço que veio  <HighLight>revolucionar</HighLight> o processo de recrutamento, seleção e gerenciamento de funcionários.
                    Para isso, oferecemos uma plataforma  <HighLight>acessível</HighLight> que conecta os candidatos com as empresas oferecendo suporte em quase todo o processo
                    de seleção. Somos um projeto que nasceu de conversas entre programadores e organizações consolidadas no ramo da tecnologia, visando
                    <HighLight> modernizar e agilizar</HighLight> a área de recursos humanos a partir das verdadeiras necessidades dos usuários.
                    A partir de ferramentas eficientes e uma interface  <HighLight>intuitiva</HighLight>, buscamos transformar a experiência dos empregados e empregadores durante o recrutamento.
                </p>
            </HomeSection>
            <section className='flex flex-col md:flex-row items-center bg-primary py-10 md:py-3 px-4 md:px-20'>
                <span className='text-2xl md:text-3xl text-white md:mr-10 flex'>
                    Parceiros 
                    <span className='hidden md:flex mx-2'>|</span>
                </span>
                <span className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-10 gap-4 my-6 w-full md:w-12/12'>
                    {
                        [
                            Cube,
                            Hearth,
                            Hourglass,
                            Star,
                        ].map((url) => <PartnerImage url={ url }></PartnerImage>)
                    }
                </span>
            </section>
            <HomeSection id='who-we-are'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6'>Quem somos</h2>
                <div className='flex flex-col md:flex-row px-6 md:pt-6 max-w-4xl'>
                    <p className='text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12'>
                        Somos uma ideia que surgiu das mentes de jovens empreendedores com o intuito de <HighLight>diminuir a
                        quantidade excessiva de tempo gasto</HighLight> no mercado de trabalho para contratar novos funcionários.
                        Buscamos a <HighLight>transparência</HighLight>, <HighLight>segurança</HighLight>,
                        <HighLight> agilidade</HighLight> e <HighLight>praticidade</HighLight> nos processos, para que tanto
                        a empresa quanto o candidato obtenham satisfação no uso do programa.
                    </p>
                    <div className='w-full md:w-6/12 my-3 md:my-0 md:ml-5 flex justify-center mt-5 lg:mt-0 lg:justify-end'>
                        <img src={ ImgComemoration } className='w-10/12 md:max-w-sm md:h-80' />
                    </div>
                </div>
                <div className='flex flex-col-reverse md:flex-row px-6 md:pt-6 max-w-4xl'>
                    <div className='w-full md:w-6/12 my-3 md:my-0 md:mr-5 flex justify-center mt-5 lg:mt-0 lg:justify-start'>
                        <img src={ ImgTeam } className='w-10/12 md:max-w-sm md:h-80' />
                    </div>
                    <p className='text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12'>
                        Nós da <HighLight>LETMIN</HighLight> prezamos pela integração de novas 
                        tecnologias ao mercado de trabalho, almejando <HighLight>modernizar os recursos humanos</HighLight>,
                        a fim de <HighLight>potencializar seu impacto</HighLight> nas atividades relacionadas ao lado mais pessoal das empresas.
                    </p>
                </div>
            </HomeSection>
            <div className='block text-center'>
                <a href='#main'>
                    <i className='fa-solid fa-circle-arrow-up text-2xl mb-5 mx-auto text-primary'></i>
                </a>
            </div>
            <Footer />
        </>
    );
}

export default Home;
