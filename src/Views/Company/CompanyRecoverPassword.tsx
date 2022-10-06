import { useState, useEffect } from "react";
import FormButton from "../../Components/Buttons/FormButton";
import TextInput from "../../Components/Inputs/TextInput";
import Footer from "../../Components/Layouts/Footer";
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from "../../Enums/InputTypesEnum";
import useAuth from "../../Utils/useAuth";
import useLoading from "../../Utils/useLoading";
import Loading from "../../Components/Items/Loading";

const CompanyRecoverPassword : React.FC = () => {
    const auth = useAuth();
    const { loading } = useLoading();
    const [emailSent, setEmailSent] = useState(false);

    useEffect((): void => {
        window.document.title = 'Letmin - Recuperar senha';
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
        email: '',
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
        auth.setLoading(true);
        return await auth.sendRecoveryEmail(data.email).then((res: any) => {
            if (res.status !== 200) {
                auth.dispatchError('Erro ao enviar email de recuperação');
                return;
            }
            auth.dispatchSuccess('Email de recuperação enviado com sucesso!');
            setEmailSent(true);
        });
    }

    return (
        <>
            <Menu menuButtons={ pageButtons } />
            <div className='w-screen min-h-screen flex flex-col items-center justify-center'>
                <form onSubmit={ handleSubmit } className='w-full md:w-6/12 lg:w-3/12 p-5'>
                    {
                        loading && <Loading />
                    }
                    {
                        emailSent ? <p className='text-green-500'>Email de recuperação enviado com sucesso!</p>    
                        : (
                            <>
                                <h1 className='text-xl font-normal'>Recuperar senha</h1>
                                <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='E-mail' name='email' />
                                <FormButton text='Enviar' isFullWidth={ true } />
                            </>
                        )
                    }
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CompanyRecoverPassword;
