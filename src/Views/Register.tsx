import Menu from '../Components/Layouts/Menu';
import Footer from '../Components/Layouts/Footer';
import RegisterCard from '../Components/Cards/RegisterCard';
import StripTitle from '../Components/Titles/StripTitle';
import { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import SecondaryLink from '../Components/Links/SecondaryLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../Utils/useAuth';


const Register : React.FC = () => {
    const CLIENT_ID: string  = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID || '';

    const auth = useAuth();

    const handleLogin = (data: any) => {
        return auth.signIn('user', data)
    };

    useEffect((): void => {
        window.document.title = 'Letmin - Cadastro';
    });

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

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
                    <div className='grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-2 gap-10 w-10/12 lg:w-8/12  my-6 md:my-10'>
                        <RegisterCard>
                            <div className='w-48 h-48 border-4 rounded-full flex items-center justify-center'>
                                <FontAwesomeIcon icon={ faUser } className='text-9xl' />
                            </div>
                            <div className='text-dark-purple text-center mb-5 font-bold text-lg lg:text-xl mt-8 mb-8'>Sou um candidato</div>
                            
                            <GoogleOAuthProvider clientId={CLIENT_ID}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handleLogin(credentialResponse);
                                    }}
                                />
                            </GoogleOAuthProvider>
                        </RegisterCard>
                        <RegisterCard>
                            <div className=' w-48 h-48 border-4 rounded-full flex items-center justify-center'>
                                <FontAwesomeIcon icon={ faBuilding } className='text-9xl' />
                            </div>
                            <div className='text-dark-purple text-center mb-5 font-bold text-lg lg:text-xl mt-8 mb-8'>Sou uma empresa</div>
                            
                            <div className='flex flex-col lg:flex-row w-full items-center justify-around'>
                                <div>
                                    <SecondaryLink text='Cadastrar' path='/register/company' />
                                </div>
                                <div className='mt-8 lg:mt-0'>
                                    <SecondaryLink text='Entrar' path='/company/login' />
                                </div>
                            </div>
                        </RegisterCard>
                    </div>
                </section>
            <Footer />
        </>
    );
}

export default Register;
