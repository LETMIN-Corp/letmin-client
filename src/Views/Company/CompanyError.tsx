import CompanyDefault from './CompanyDefault';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const CompanyError : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - 404';
    }, []);

    return (
        <CompanyDefault>
            <div className='h-96 w-full flex flex-col items-center justify-center'>
                <div>
                    <FontAwesomeIcon icon={ faTriangleExclamation } className='text-9xl text-black' />
                </div>
                <h1 className='text-xl font-bold text-center px-10 my-10 text-black'>404 - Página Não Encontrada</h1>
                <div>
                    <SecondaryLink path='/company/indicators' text='Voltar'></SecondaryLink>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyError;
