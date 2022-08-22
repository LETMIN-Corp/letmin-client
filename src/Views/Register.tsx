import Menu from '../Components/Layouts/Menu';
import Footer from '../Components/Layouts/Footer';
import RegisterCard from '../Components/Cards/RegisterCard';
import StripTitle from '../Components/Titles/StripTitle';
import { useEffect } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Register : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Cadastro';
    }, []);

    const menuButtons = [
        {
            text: 'Home',
            path: '/',
            isLink: true,
        },
    ];

    function redirectToLogin() {
        window.location.href = API_URL + '/api/users/google';
    }

    return (
        <>
            <Menu menuButtons={ menuButtons } />
            <StripTitle text='Cadastro' />
            <button onClick={redirectToLogin} >Google</button>
            <section className='flex flex-col justify-center items-center md:py-10'>
                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-2 gap-10 w-10/12 lg:w-8/12  my-6 md:my-10'>
                    {
                        [
                            {
                                icon: 'fa-solid fa-user',
                                title: 'Sou um candidato',
                                text: 'Cadastrar',
                                path: API_URL + '/api/user/register',
                            },
                            {
                                icon: 'fa-solid fa-building',
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
