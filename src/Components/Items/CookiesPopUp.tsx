import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SecondaryButton from "../Buttons/SecondaryButton";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const CookiesPopUp : React.FC = () => {
    const [cookiesAccepted, setCookiesAccepted] = useState<boolean | string | undefined>(false);

    useEffect(() => {
        setCookiesAccepted(Cookies.get('cookiesAccepted'));
    }, []);

    function acceptCookie() {
        Cookies.set('cookiesAccepted', '1');
        setCookiesAccepted(true);
    }

    return (
        <>
        {
            !cookiesAccepted && (
                <div className='rounded-md md:w-6/12 lg:w-3/12 bg-white p-5 border-2 border-lilac fixed bottom-5 left-5 right-5 drop-shadow-2xl'>
                    <div className='text-dark-purple flex items-center'>
                        <FontAwesomeIcon className='text-2xl mr-2' icon={ faCookieBite } />
                        <h3 className='font-medium text-lg'>Aceitar cookies</h3>
                    </div>
                    <div className='text-sm md:text-md text-justify mb-4 text-lg'>
                        Ao clicar em "Aceitar todos os cookies", você concorda que a Letmin pode guardar cookies no seu dispositivo e utilizar essas informações de acordo com a nossa política de cookies.
                    </div>
                    <div className='w-full flex justify-center'>
                        <SecondaryButton text='Aceitar todos os cookies' handleClick={ () => acceptCookie() }  />
                    </div>
                </div>
            )
        }
        </>
    );
}

export default CookiesPopUp;
