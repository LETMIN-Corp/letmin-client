import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContextProvider";
import Loading from "../Loading";

const AdminLogin : React.FC = () => {
    const { signIn, loading, isAuthenticated, userData, getRole }:any = useContext(AuthContext);
    const navigate = useNavigate();
        
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn('admin', { email, password });

        if (getRole() === 'admin') {
            navigate(`/admin/companies`);
        }

        return;
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
                    <h1 className='font-md text-lg mb-5'>Login</h1>
                    <input type='text' placeholder='Email' name='email' id='email' className='w-full rounded-sm outline-none py-1' onChange={(e) => setEmail(e.target.value)} />
                    <span className='w-full h-1 bg-gray block mb-5 rounded-xl opacity-30'></span>
                    <input type='password' placeholder='Senha' name='password' id='password' className='w-full rounded-sm outline-none py-1' onChange={(e) => setPassword(e.target.value)} />
                    <span className='w-full h-1 bg-gray block mb-5 rounded-xl opacity-30'></span>

                    <button className='drop-shadow-md w-full text-center text-white bg-primary rounded-sm py-2 hover:bg-dark-purple ease-out duration-200'>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
