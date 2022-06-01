import CompanyDefault from './CompanyDefault';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import { useEffect } from 'react';

const CompanyPage : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Menu';
    });

    return (
        <CompanyDefault>
            <div className='h-96 w-full flex flex-col items-center justify-center'>
                <div>
                    <i className="fa-solid fa-triangle-exclamation text-9xl text-black"></i>
                </div>
                <h1 className='text-xl font-bold text-center px-10 my-10 text-black'>404 - Página Não Encontrada</h1>
                <div>
                    <SecondaryLink path='/company/indicators' text='Voltar'></SecondaryLink>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyPage;
