import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import FormButton from '../../Components/Buttons/FormButton';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import Footer from '../../Components/Layouts/Footer';
import Menu from '../../Components/Layouts/Menu';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import useAuth from '../../Utils/useAuth';
import useLoading from '../../Utils/useLoading';

const CompanyPasswordDefinition: React.FC = () => {
    const auth = useAuth();
    const { loading, setLoading } = useLoading();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const selector = searchParams.get('selector');
    const token = searchParams.get('token');

    const [validToken, setValidToken] = useState(false);

    if (!selector || !token) {
        auth.dispatchError('Token inválido');
        setValidToken(false);
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Definir nova senha';

        auth.checkRecoveryToken(selector, token).then((res: any) => {
            if (res.status !== 200) {
                auth.dispatchError('Token inválido');
                setValidToken(false);
                return;
            }
            setValidToken(true);
        });
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
        password: '',
        confirmation: '',
    });

    function getInputValue(name: string): string {
        return data[name];
    }

    function setInputValue(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ): void {
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
        if (data.password !== data.confirmation) {
            auth.dispatchError('As senhas não conferem');
            return;
        }
        return await auth
            .setNewPassword(selector, token, data.password)
            .then((res: any) => {
                if (res.status !== 200) {
                    auth.dispatchError('Erro ao definir nova senha');
                    return;
                }
                auth.dispatchSuccess('Senha definida com sucesso');
                setLoading(false);

                navigate('/company/login');
            });
    };

    return (
        <>
            <Menu menuButtons={pageButtons} />
            <div className="w-screen min-h-screen flex flex-col items-center justify-center">
                {loading ? (
                    <Loading />
                ) : validToken ? (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full md:w-6/12 lg:w-3/12 p-5"
                    >
                        <h1 className="text-xl font-normal">Definir nova senha</h1>
                        <TextInput
                            type={InputTypesEnum.password}
                            consultPackage={consultPackage}
                            placeholder="Senha"
                            name="password"
                        />
                        <TextInput
                            type={InputTypesEnum.password}
                            consultPackage={consultPackage}
                            placeholder="Confirmar Senha"
                            name="confirmation"
                        />
                        <FormButton text="Enviar" isFullWidth={true} />
                    </form>
                ) : (
                    <p className="text-red-500">Token inválido</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CompanyPasswordDefinition;
