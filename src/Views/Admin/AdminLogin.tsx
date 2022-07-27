import { useEffect } from "react";

const AdminLogin : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Login';
    }, []);

    return (
        <div className='w-screen min-h-screen flex items-center justify-center bg-primary'>
            <div className='p-8 rounded-md flex items-center h-screen w-screen sm:h-auto sm:max-w-sm bg-white drop-shadow-xl'>
                <form className='w-full'>
                    <h1 className='font-md text-lg mb-5'>Login</h1>
                    <input type='text' placeholder='Usuário' name='user' id='user' className='w-full rounded-sm outline-none py-1'  />
                    <span className='w-full h-1 bg-gray block mb-5 rounded-xl opacity-30'></span>
                    <input type='password' placeholder='Senha' name='password' id='password' className='w-full rounded-sm outline-none py-1' />
                    <span className='w-full h-1 bg-gray block mb-5 rounded-xl opacity-30'></span>

                    <button className='drop-shadow-md w-full text-center text-white bg-primary rounded-sm py-2 hover:bg-dark-purple ease-out duration-200'>Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
