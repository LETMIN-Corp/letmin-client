import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';
import AdminDefault from './AdminDefault';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const AdminError : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - 404';
    }, []);

    return (
        <AdminDefault>
            <div className='min-h-90 w-full flex flex-col items-center justify-center'>
                <div>
                    <FontAwesomeIcon icon={ faTriangleExclamation } className='text-9xl text-black' />
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
