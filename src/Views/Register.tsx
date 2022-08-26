import Menu from '../Components/Layouts/Menu';
import Footer from '../Components/Layouts/Footer';
import RegisterCard from '../Components/Cards/RegisterCard';
import StripTitle from '../Components/Titles/StripTitle';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContextProvider";
import GoogleIcon from '../Assets/google-icon.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Register : React.FC = () => {

    const CLIENT_ID: string  = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID || '';

    const { isAuthenticated, userData, signOut, loginGoogle }:any = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Cadastro';

        if(isAuthenticated && userData.role === 'user') {
            navigate(`/user/profile`);
        }
    }, [isAuthenticated]);

    const menuButtons = [
        {
            text: 'Home',
            path: '/',
            isLink: true,
        },
    ];
    
    return (
        <>
            <Menu menuButtons={ menuButtons } />
            <StripTitle text='Cadastro' />
            <section className='flex flex-col justify-center items-center md:py-10'>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        loginGoogle(credentialResponse.credential);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
                <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-2 gap-10 w-10/12 lg:w-8/12  my-6 md:my-10'>
                    {
                        [
                            {
                                icon: 'fa-solid fa-user',
                                title: 'Sou um candidato',
                                text: 'Cadastrar',
                                path: '',
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
