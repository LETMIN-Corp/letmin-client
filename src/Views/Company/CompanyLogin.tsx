import { useEffect } from "react";
import FormButton from "../../Components/Buttons/FormButton";
import TextInput from "../../Components/Inputs/TextInput";
import Footer from "../../Components/Layouts/Footer";
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from "../../Utils/InputTypesEnum";

const CompanyLogin : React.FC = () => {
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

    return (
        <>
            <Menu menuButtons={ pageButtons } />
            <div className='w-screen min-h-screen flex items-center justify-center'>
                <div className='w-full md:w-6/12 lg:w-3/12 p-5'>
                    <h1 className='text-xl font-normal'>Entrar</h1>
                    <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='Email' name='' />
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='' />
                    <FormButton text='Entrar' handleClick={ () => {} } isFullWidth={ true } />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CompanyLogin;
