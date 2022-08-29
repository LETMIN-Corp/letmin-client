import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TextInput from "../../Components/Inputs/TextInput";
import { AuthContext } from "../../Context/AuthContextProvider";
import InputTypesEnum from "../../Utils/InputTypesEnum";
import Loading from "../Loading";

const AdminLogin : React.FC = () => {
    const { signIn, loading, isAuthenticated, userData, getRole }:any = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let email = data.email;
        let password = data.password;
        await signIn('admin', { email, password });

        if (getRole() === 'admin') {
            navigate(`/admin/companies`);
        }

        navigate(`/admin/login`);
    };

    useEffect((): void => {
        window.document.title = 'Letmin - Login';

        if(isAuthenticated && userData.role === 'admin') {
            navigate(`/admin/companies`);
        }
    }, [isAuthenticated]);

    if(loading) return (<Loading />);

    return (
        <div className='w-screen min-h-screen flex items-center justify-center bg-primary'>
            <div className='p-8 rounded-md flex items-center h-screen w-screen sm:h-auto sm:max-w-sm bg-white drop-shadow-xl'>
                <form className='w-full' onSubmit={handleSubmit}>
                    <h1 className='font-medium text-lg mb-5'>Login</h1>
                    <TextInput type={ InputTypesEnum.email } consultPackage={ consultPackage } placeholder='Email' name='email' />
                    <TextInput type={ InputTypesEnum.password } consultPackage={ consultPackage } placeholder='Senha' name='password' />
                    <button className='drop-shadow-md w-full text-center text-white bg-primary rounded-sm py-2 hover:bg-dark-purple ease-out duration-200'>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
