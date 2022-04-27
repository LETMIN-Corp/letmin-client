import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardRegister from '../Components/CardRegister';
import clientImage from "../public/images/circle-user.png"
import companyImage from "../public/images/circle-company.png"

const Register : React.FC = () => {
    return (
        <>
            <Header />
            <div id="main" className="flex justify-center py-10 bg-primary">
                <h1 className="text-white text-4xl md:text-6xl font-black mt-20">Cadastro</h1>
            </div>
            <section className="min-h-screen flex flex-col justify-center items-center py-5">
                <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-2 gap-20 w-10/12 lg:w-8/12  my-6 md:my-10">
                    {
                        [
                            {
                                image: clientImage,
                                title: 'Sou um candidato',
                                text: 'Linkedin',
                            },
                            {
                                image: companyImage,
                                title: 'Sou uma empresa',
                                text: 'Cadastrar',
                            },
                        ].map((card) => <CardRegister key={ card.text } card={ card } />)
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;
