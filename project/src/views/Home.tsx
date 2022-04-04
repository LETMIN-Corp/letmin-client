import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Card from '../components/Card'
import PartnerPhoto from '../components/PartnerPhoto';
import Footer from '../components/Footer';

function Home () {
    return (
        <>
            <Header />
            <main className='min-h-screen flex flex-col md:flex-row justify-center items-center bg-primary relative'>
                <div className="w-8/12 md:w-6/12 text-center md:text-left mb-8"> 
                    <h1 className="text-6xl md:text-8xl lg:text-9xl text-black font-black md:w-10/12 lg:w-8/12 md:flex drop-shadow-lg">LET ME IN</h1>
                </div>
                <div className="w-10/12 md:w-4/12 text-center md:text-left">
                    <p className="text-white text-xl my-5">Uma forma rápida e fácil de gerenciar seu recrutamento</p>
                    
                    <Link
                        to="/register"
                        className="rounded-full text-xl text-white font-bold py-2 px-4 text-md bg-dark-purple drop-shadow-lg border-2 border-dark-purple hover:border-white hover:bg-lively-purple ease-out duration-200"
                    >
                        Cadastre-se
                    </Link>
                </div>
            </main>
            <section id='differential' className='min-h-screen flex flex-col justify-center items-center py-10'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Nada parecido no mercado</h2>
                <div className='px-10 md:w-10/12 lg:w-8/12 my-6 md:my-10'>
                    <p className='w-12/12 md:w-6/12 text-lg md:text-xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nihil ea neque velit eligendi, nemo accusantium cum quis dolor? Perspiciatis dolorem quod debitis. Aperiam nobis provident, quos itaque illum laboriosam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Error officia provident ipsum unde ut, cum pariatur excepturi voluptas ducimus eos debitis eligendi illum quaerat quisquam tempore! Odit optio deserunt ab!
                    </p>
                </div>
            </section>
            <section className='min-h-screen flex flex-col justify-center items-center bg-primary py-10'>
                <h2 className='text-4xl text-center font-bold px-6 mb-10'>Contrate com<br /> mais eficiência</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-10/12 lg:w-8/12 my-6 md:my-10'>
                    {
                        [
                            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui pariatur doloribus expedita deleniti, earum provident aspernatur animi illo ad quisquam obcaecati quo eum quos, odio accusamus incidunt reprehenderit modi enim. ',
                            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui pariatur doloribus expedita deleniti, earum provident aspernatur animi illo ad quisquam obcaecati quo eum quos, odio accusamus incidunt reprehenderit modi enim.',
                            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui pariatur doloribus expedita deleniti, earum provident aspernatur animi illo ad quisquam obcaecati quo eum quos, odio accusamus incidunt reprehenderit modi enim.', 
                        ].map((text, key) => <Card key={ key } text={ text } />)
                    }
                </div>
            </section>
            <section id='about' className='min-h-screen flex flex-col justify-center items-center py-10'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6 mb-4'>Sobre</h2>
                <p className='text-justify w-10/12 lg:w-8/12 my-6'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus optio dolorem doloribus esse iste consectetur quaerat magni laudantium quibusdam? Esse incidunt natus voluptatibus earum vitae quod eos iure, rerum ut!
                </p>
            </section>
            <section className='flex flex-col md:flex-row items-center bg-primary py-10 md:py-3 px-4 md:px-20'>
                <span className='text-2xl md:text-4xl text-white md:mr-10 flex'>
                    Parceiros 
                    <span className='hidden md:flex mx-2'>|</span>
                </span>
                <span className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-10 gap-4 my-6 w-full md:w-12/12'>
                    {/* {
                        [
                            partnerImage,
                            partnerImage,
                            partnerImage,
                        ].map((url, key) => <PartnerPhoto key={ key } url={ url } />)
                    } */}
                </span>
            </section>
            <section id='who-we-are' className='min-h-screen flex flex-col justify-center items-center py-10 md:py-20'>
                <h2 className='text-4xl text-center text-dark-purple font-bold px-6'>Quem somos</h2>
                <div className='flex flex-col md:flex-row px-6 md:py-6 max-w-4xl'>
                    <p className='text-justify mt-8 md:w-6/12'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ipsam itaque, reiciendis esse voluptate autem unde nam odio laborum. Quaerat error eius veniam velit illo sed, culpa recusandae asperiores perspiciatis?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ipsam itaque, reiciendis esse voluptate autem unde nam odio laborum. Quaerat error eius veniam velit illo sed, culpa recusandae asperiores perspiciatis?
                    </p>
                    <div className='md:w-6/12 bg-dark-purple my-3 md:ml-5 h-96'></div>
                </div>
                <div className='flex flex-col-reverse md:flex-row px-6 md:py-6 max-w-4xl'>
                    <div className='md:w-6/12 bg-dark-purple my-3 md:mr-5 h-96'></div>
                    <p className='text-justify md:w-6/12'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ipsam itaque, reiciendis esse voluptate autem unde nam odio laborum. Quaerat error eius veniam velit illo sed, culpa recusandae asperiores perspiciatis?
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ipsam itaque, reiciendis esse voluptate autem unde nam odio laborum. Quaerat error eius veniam velit illo sed, culpa recusandae asperiores perspiciatis?
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;
