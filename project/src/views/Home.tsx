import Header from '../Components/Header';
import { Link } from 'react-router-dom';

function Home () {
    return (
        <>
            <Header />
            <main className='flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-r to-bold-purple from-primary'>
                <div className="w-8/12 md:w-6/12 text-center md:text-left mb-8"> 
                    <h1 className="text-6xl md:text-9xl text-black font-black md:w-7/12 md:flex drop-shadow-lg">LET ME IN</h1>
                </div>
                <div className="w-10/12 md:w-4/12 text-center md:text-left">
                    <p className="text-white text-2xl mb-5">Uma forma rápida e fácil de gerenciar seu recrutamento</p>
                    
                    <Link
                        to="/"
                        className="rounded-full text-xl text-white font-bold py-2 px-4 text-md bg-dark-purple drop-shadow-lg border-2 border-dark-purple hover:border-white hover:bg-lively-purple ease-out duration-200"
                    >
                        Cadastre-se
                    </Link>
                </div>
            </main>
        </>
    );
}

export default Home;
