import CompanyDefault from './CompanyDefault';
import { useEffect } from 'react';
import CompanyEditCard from '../../Components/Cards/CompanyEditCard';
import TextInput from '../../Components/Inputs/TextInput';
import InputTypesEnum from '../../Utils/InputTypesEnum';
import SelectInput from '../../Components/Inputs/SelectInput';

const CompanyProfile = () => {
    useEffect((): void => {
        window.document.title = 'Meus Dados';
    });

    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>Meus Dados</h1>
                <div>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-xl flex items-center w-full justify-between'>
                            <span>Informações da Empresa</span>
                            <i className="fa-solid fa-gear cursor-pointer"></i>
                        </h3>
                        <form className='mt-2'>
                            <div className='md:flex justify-between w-full'>
                                <TextInput placeholder='Razão Social' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-name' disabled={ true }/>
                                <TextInput placeholder='CNPJ' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-cnpj' disabled={ true } />
                            </div>
                            <div className='md:flex justify-between w-full'>
                                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='company-email' disabled={ true }/>
                                <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='company-phone' disabled={ true }/>
                            </div>
                            <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-address' disabled={ true }/>
                        </form>
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-xl flex items-center w-full justify-between'>
                            <span>Informações do Titular</span>
                            <i className="fa-solid fa-gear cursor-pointer"></i>
                        </h3>
                        <form className='mt-2'>
                            <div className='md:flex justify-between w-full'>
                                <TextInput placeholder='Nome do Titular' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='holder-name' disabled={ true }/>
                                <TextInput placeholder='CPF' type={ InputTypesEnum.text } size='medium' consultPackage={ viewConsultPackage } name='holder-cpf' disabled={ true }/>
                            </div>
                            <div className='md:flex justify-between w-full'>
                                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='holder-email' disabled={ true }/>
                                <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='holder-phone' disabled={ true }/>
                            </div>
                        </form>
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-xl flex items-center w-full justify-between'>
                            <span>Informações da Assinatura</span>
                            <i className="fa-solid fa-gear cursor-pointer"></i>
                        </h3>
                        <div className='mt-2'>
                            <TextInput placeholder='Plano Selecionado' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='plan-selected' disabled={ true }/>
                        </div>
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-xl flex items-center w-full justify-between'>
                            <span>Informações do Cartão</span>
                            <i className="fa-solid fa-gear cursor-pointer"></i>
                        </h3>
                        <form className='mt-2'>
                            <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-owner' disabled={ true }/>
                            <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-number' disabled={ true }/>
                            
                            <div className='md:flex justify-between w-full'>
                                <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-due' disabled={ true }/>
                                <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-code' disabled={ true }/>
                                <SelectInput placeholder='Bandeira' options={ [] } size='small' consultPackage={ viewConsultPackage } name='card-type' disabled={ true }/>
                            </div>
                        </form>
                    </CompanyEditCard>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyProfile;
