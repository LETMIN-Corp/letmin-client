import { useState, useEffect } from "react";
import FormButton from "../../Components/Buttons/FormButton";
import TextInput from "../../Components/Inputs/TextInput";
import Footer from "../../Components/Layouts/Footer";
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from "../../Enums/InputTypesEnum";
import useAuth from "../../Utils/useAuth";

const CompanyPasswordDefinition : React.FC = () => {
    const auth = useAuth();

    useEffect((): void => {
        window.document.title = 'Letmin - Definir nova senha';
    }, []);

    const pageButtons = [
        {
            text: 'Voltar',
            path: '/company/login',
            isLink: true,
        }
    ];

    interface IRegisterData {
        [key: string]: string,
    }
    
    const [data, setData] = useState<IRegisterData>({
        password: '',
        confirmation: '',
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
        // return await auth.signIn('company', data)
    }

    return (
        <>
            <Menu menuButtons={ pageButtons } />
            <div className='w-screen min-h-screen flex flex-col items-center justify-center'>
                <form onSubmit={ handleSubmit } className='w-full md:w-6/12 lg:w-3/12 p-5'>
                    <h1 className='text-xl font-normal'>Definir nova senha</h1>
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='passoword' />
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Confirmar Senha' name='confirmation' />
                    <FormButton text='Enviar'  isFullWidth={ true } />
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CompanyPasswordDefinition;
