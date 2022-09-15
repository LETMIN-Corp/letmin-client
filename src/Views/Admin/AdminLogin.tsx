import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TextInput from "../../Components/Inputs/TextInput";
import InputTypesEnum from "../../Enums//InputTypesEnum";
import useAuth from "../../Utils/useAuth";

const AdminLogin : React.FC = () => {
    const auth = useAuth();
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
        await auth.signIn('admin', data )
    };

    useEffect((): void => {
        window.document.title = 'Letmin - Login';

        if(auth.isAuthenticated && auth.userData.role === 'admin') {
            navigate(`/admin/companies`);
        }
    }, [auth.userData]);

    if(auth.loading) return (
        <div className="text-center">
            <div role="status">
                <svg className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" className='text-white' fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
            </div>
        </div>
    );

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
