import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';
import AdminDefault from './AdminDefault';

const AdminError : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin';
    });

    return (
        <AdminDefault>
            <div className='h-96 w-full flex flex-col items-center justify-center'>
                <div>
                    <i className="fa-solid fa-triangle-exclamation text-9xl text-black"></i>
                </div>
                <h1 className='text-xl font-bold text-center px-10 my-10 text-black'>404 - Página Não Encontrada</h1>
                <div>
                    <SecondaryLink path='/admin/company' text='Voltar'></SecondaryLink>
                </div>
            </div>
        </AdminDefault>
    );
}

export default AdminError;
