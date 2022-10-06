import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TextInput from "../../Components/Inputs/TextInput";
import InputTypesEnum from "../../Enums//InputTypesEnum";
import useAuth from "../../Utils/useAuth";
import Loading from '../../Components/Items/Loading';
import useLoading from '../../Utils/useLoading';

const AdminLogin : React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    interface IRegisterData {
        [key: string]: string,
    }
    const { loading } = useLoading();
    
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

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await auth.signIn('admin', data);
    };

    useEffect((): void => {
        window.document.title = 'Letmin - Login';

        if(auth.isAuthenticated && auth.userData.role === 'admin') {
            navigate(`/admin/companies`);
        }
    }, [auth.isAuthenticated]);

    return (
        <>
        {
            loading ? <Loading />
            : (
                <div className='w-screen min-h-screen flex items-center justify-center bg-primary'>
                    <div className='p-8 rounded-md flex items-center h-screen w-screen sm:h-auto sm:max-w-sm bg-white drop-shadow-xl'>
                        <form className='w-full' onSubmit={handleSubmit}>
                            <h1 className='font-medium text-lg mb-5'>Login</h1>
                            <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='E-mail' name='email' />
                            <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='password' />
                            <button className='drop-shadow-md w-full text-center text-white bg-primary rounded-sm py-2 hover:bg-dark-purple ease-out duration-200'>Enviar</button>
                        </form>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default AdminLogin;
