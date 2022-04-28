import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card';


const Home : React.FC = () => {
    return (
        <>
            <Header />
            <main id="main" className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-primary">
                <div className="w-8/12 md:w-6/12 text-center md:text-left mb-8"> 
                    <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-black md:w-10/12 lg:w-8/12 md:flex drop-shadow-lg">LET ME IN</h1>
                </div>
                <div className="w-10/12 md:w-4/12 text-center md:text-left">
                    <p className="text-white text-xl my-5 font-medium">Uma forma rápida e fácil de gerenciar seu recrutamento</p>
                    
                    <Link
                        to="/register"
                        className="rounded-full text-xl text-white font-bold py-2 px-4 text-md bg-dark-purple drop-shadow-lg border-2 border-dark-purple hover:border-white hover:bg-lively-purple ease-out duration-200"
                    >
                        Cadastre-se
                    </Link>
                </div>
            </main>
            <section id="differential" className="min-h-screen flex flex-col justify-center items-center py-10">
                <h2 className="text-4xl text-center text-dark-purple font-bold px-6 mb-4">Nada parecido no mercado</h2>
                <div className="px-10 md:w-10/12 lg:w-8/12 my-6 md:my-10">
                    <p className="w-12/12 md:w-6/12 text-lg md:text-xl text-justify">
                        Oferecemos um serviço <b className='text-primary'>rápido e fácil</b> em sua utilização,
                        onde toda a triagem da mão de obra é feita através do aplicativo.
                        A vantagem na utilização do App é reduzir o custo e o tempo que a empresa gastaria na seleção de candidatos aptos ao cargo,
                        e fornecer <b className='text-primary'>relatórios sobre o andamento das entrevistas</b> e de cada candidato.
                        A vantagem para os candidatos é a <b className='text-primary'>redução no tempo gasto em longas filas de emprego</b>,
                        pois o mesmo tem condições de estar concorrendo a várias vagas de emprego ao mesmo tempo,
                        através do currículo e perfil cadastrado na aplicação.
                    </p>
                </div>
            </section>
            <section className="min-h-80 flex flex-col justify-center items-center bg-bright-purple py-10">
                <h2 className="text-4xl text-white text-center font-bold px-6">
                    Contrate com <br />
                    mais eficiência
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-10/12 lg:w-8/12 my-6 md:my-10">
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
                        ].map((card, key) => <Card key={ key } card={ card } />)
                    }
                </div>
            </section>
            <section id="about" className="min-h-screen flex flex-col justify-center items-center py-10">
                <h2 className="text-4xl text-center text-dark-purple font-bold px-6 mb-4">Sobre</h2>
                <p className="text-lg md:text-xl text-justify w-10/12 lg:w-8/12 my-6">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                </p>
            </section>
            <section className="flex flex-col md:flex-row items-center bg-primary py-10 md:py-3 px-4 md:px-20">
                <span className="text-2xl md:text-3xl text-white md:mr-10 flex">
                    Parceiros 
                    <span className="hidden md:flex mx-2">|</span>
                </span>
                <span className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-10 gap-4 my-6 w-full md:w-12/12">
                    {/* {
                        [
                            partnerImage,
                            partnerImage,
                            partnerImage,
                        ].map((url, key) => <PartnerPhoto key={ key } url={ url } />)
                    } */}
                </span>
            </section>
            <section id="who-we-are" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20">
                <h2 className="text-4xl text-center text-dark-purple font-bold px-6">Quem somos</h2>
                <div className="flex flex-col md:flex-row px-6 md:pt-6 max-w-4xl">
                    <p className="text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12">
                        Somos uma ideia que surgiu das mentes de jovens empreendedores com o intuito de <b className='text-primary'>diminuir a
                        quantidade excessiva de tempo gasto</b> no mercado de trabalho para contratar novos funcionários.
                        Buscamos a <b className='text-primary'>transparência</b>, <b className='text-primary'>segurança</b>,
                        <b className='text-primary'> agilidade</b> e <b className='text-primary'>praticidade</b> nos processos, para que tanto
                        a empresa quanto o candidato obtenham satisfação no uso do programa.
                    </p>
                    <div className="md:w-6/12 my-3 md:my-0 md:ml-5"></div>
                </div>
                <div className="flex flex-col-reverse md:flex-row px-6 md:pt-6 max-w-4xl">
                    <div className="md:w-6/12 my-3 md:my-0 md:mr-5"></div>
                    <p className="text-lg md:text-xl text-justify mt-8 md:mt-0 md:w-6/12">
                        Nós da <b className='text-primary'>LETMIN</b> prezamos pela integração de novas 
                        tecnologias ao mercado de trabalho, almejando <b className='text-primary'>moodernizar os recursos humanos</b>,
                        a fim de <b className='text-primary'>potencializar seu impacto</b> nas atividades relacionadas ao lado mais pessoal das empresas.
                    </p>
                </div>
            </section>
            <div className='block text-center'>
                <a href="#main" className="">
                    <i className="fa-solid fa-circle-arrow-up text-2xl mb-5 mx-auto text-primary"></i>
                </a>
            </div>
            <Footer />
        </>
    );
}

export default Home;
