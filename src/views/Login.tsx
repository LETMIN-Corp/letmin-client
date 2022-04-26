import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from '../Components/Card-login';

function Login () {
    return (
        <>
            <Header />
            <main id="main" className="h-64 flex flex-col md:flex-row justify-center items-center bg-primary">
                <div className="text-center mt-20"> 
                    <h1 className="text-white text-6xl md:text-8xl md:w-10/12 lg:w-8/12 font-black ">Login</h1>
                </div>
            </main>
            <section className="min-h-80 flex flex-col justify-center items-center py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-10/12 lg:w-8/12  my-6 md:my-10">
                    {
                        [
                            {
                                image: 'logoImage',
                                title: 'Sou um candidato',
                                text: 'Além d da visualização da compatibilidade entre empresa e funcionário.',
                            },
                            {
                                image: '',
                                title: 'Sou uma empresa',   
                                text: 'Além de elaborarmosação da compatibilidade entre empresa e funcionário.',
                            },
                        ].map((card, key) => <Card key={ key } card={ card } />)
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}
//min-h-screen flex flex-col md:flex-row 

export default Login;