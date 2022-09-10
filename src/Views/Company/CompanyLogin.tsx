import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FormButton from "../../Components/Buttons/FormButton";
import TextInput from "../../Components/Inputs/TextInput";
import Footer from "../../Components/Layouts/Footer";
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from "../../Enums//InputTypesEnum";
import useAuth from "../../Utils/useAuth";

const CompanyLogin : React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Login';
    }, []);

    const pageButtons = [
        {
            text: 'Voltar',
            path: '/register',
            isLink: true,
        }
    ];

    interface IRegisterData {
        [key: string]: string,
    }
    
    const [data, setData] = useState<IRegisterData>({
        email: '',
        password: '',
    });

    function getInputValue (name: string): string {
        return data[name];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await auth.signIn('company', data)
        .then((res : any) => {
            if (res.status !== 200) {
                alert('Erro no login');
            }
        })

        return;
    }

    return (
        <>
            <Menu menuButtons={ pageButtons } />
            <div className='w-screen min-h-screen flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full md:w-6/12 lg:w-3/12 p-5'>
                    <h1 className='text-xl font-normal'>Entrar</h1>
                    <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='Email' name='email' />
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='password' />
                    <FormButton text='Entrar'  isFullWidth={ true } />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CompanyLogin;
