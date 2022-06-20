import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import SecondaryLink from '../../Components/Links/SecondaryLink';

const CompanyMatch : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Combinacoes';
    });

    return (
        <CompanyDefault>
            <div className="p-5">
                <h1 className='text-2xl'> Combinações </h1>
                <div className='flex justify-between'>
                    <div>
                        <div className='bg-gray rounded-md'>
                            bdfyuasyfugdsygdfyu
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='text-3xl font-bold text-center'>
                            Combinação Perfeita!
                        </div>
                        <div className='flex justify-between mt-8'>
                            <SecondaryLink path='/' text='Ver Perfil' />
                            <SecondaryLink path='/' text='Próximo' />
                        </div>
                    </div>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyMatch;
