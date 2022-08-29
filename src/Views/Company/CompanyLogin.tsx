import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FormButton from "../../Components/Buttons/FormButton";
import TextInput from "../../Components/Inputs/TextInput";
import Footer from "../../Components/Layouts/Footer";
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from "../../Utils/InputTypesEnum";
import { AuthContext } from "../../Context/AuthContextProvider";

const CompanyLogin : React.FC = () => {
    const { signIn, loading, isAuthenticated, userData, getRole }:any = useContext(AuthContext);
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

    const consultPackage = {
        getValue: () => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { },
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn('admin', { email, password });

        if (getRole() === 'admin') {
            navigate(`/admin/companies`);
        }

        return;
    }

    return (
        <>
            <Menu menuButtons={ pageButtons } />
            <div className='w-screen min-h-screen flex items-center justify-center'>
                <div className='w-full md:w-6/12 lg:w-3/12 p-5'>
                    <h1 className='text-xl font-normal'>Entrar</h1>
                    <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='Email' name='' />
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='' />
                    <FormButton text='Entrar' handleClick={ () => {handleSubmit} } isFullWidth={ true } />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CompanyLogin;
