import Header from '../Components/Layouts/Header';
import Footer from '../Components/Layouts/Footer';
import RegisterCard from '../Components/Cards/RegisterCard';
import clientImage from "../Assets/circle-user.png"
import companyImage from "../Assets/circle-company.png"
import StripTitle from '../Components/Titles/StripTitle';

const Register : React.FC = () => {
    return (
        <>
            <Header />
            <StripTitle text='Cadastro' />
            <section className="flex flex-col justify-center items-center lg:py-16">
                <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-2 gap-10 w-10/12 lg:w-8/12  my-6 md:my-10">
                    {
                        [
                            {
                                image: clientImage,
                                title: 'Sou um candidato',
                                text: 'Linkedin',
                                path: '',
                            },
                            {
                                image: companyImage,
                                title: 'Sou uma empresa',
                                text: 'Cadastrar',
                                path: '/register/company',
                            },
                        ].map((card) => <RegisterCard card={ card } key={ card.path } />)
                    }
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;
