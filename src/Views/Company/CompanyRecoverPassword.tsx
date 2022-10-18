import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SubmitButton from '../../Components/Buttons/SubmitButton';
import TextInput from '../../Components/Inputs/TextInput';
import Footer from '../../Components/Layouts/Footer';
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import useAuth from '../../Utils/useAuth';

const CompanyRecoverPassword: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Recuperar senha';
    }, []);

    const pageButtons = [
        {
            text: 'Voltar',
            path: '/company/login',
            isLink: true,
        },
    ];

    interface IRegisterData {
        [key: string]: string;
    }

    const [data, setData] = useState<IRegisterData>({
        email: '',
    });

    function getInputValue(name: string): string {
        return data[name];
    }

    function setInputValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return await auth.sendRecoveryEmail(data.email).then((res: any) => {
            if (res.status !== 200) {
                auth.dispatchError('Erro ao enviar email de recuperação');
                return;
            }
            auth.dispatchSuccess('Email de recuperação enviado com sucesso!');
            navigate('/company/login');
        });
    };

    return (
        <>
            <Menu menuButtons={pageButtons} />
            <div className="w-screen min-h-screen flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full md:w-6/12 lg:w-3/12 p-5">
                    <h1 className="text-xl font-normal">Recuperar senha</h1>
                    <TextInput
                        type={InputTypesEnum.email}
                        consultPackage={consultPackage}
                        placeholder="E-mail"
                        name="email"
                    />
                    <SubmitButton text="Enviar" loading={auth.loading} />
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CompanyRecoverPassword;
