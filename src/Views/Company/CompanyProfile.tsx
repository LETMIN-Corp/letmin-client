import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import CompanyEditCard from '../../Components/Cards/CompanyEditCard';
import TextInput from '../../Components/Inputs/TextInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import SelectInput from '../../Components/Inputs/SelectInput';
import FormModal from '../../Components/Modals/FormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

const CompanyProfile = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Meus Dados';
    }, []);

    interface FormModalInterface {
        title?: string,
        form?: JSX.Element,
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formModal, setFormModal] = useState<FormModalInterface>({});

    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faAddressCard } className='mr-2' />
                    <span>Meus Dados</span>
                </h1>
                <div>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                            <span>Informações da Empresa</span>
                            <i
                                onClick={
                                    () => {
                                        setModalIsOpen(true);
                                        setFormModal({
                                            title: 'Informações da Empresa',
                                            form: <CompanyForm isDisabled={ false } />,
                                        });
                                    }
                                }
                                className='fa-solid fa-gear cursor-pointer'
                            >
                            </i>
                        </h3>
                        <CompanyForm isDisabled={ true } />
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                            <span>Informações do Titular</span>
                            <i
                                onClick={
                                    () => {
                                        setModalIsOpen(true);
                                        setFormModal({
                                            title: 'Informações do Titular',
                                            form: <HolderForm isDisabled={ false } />,
                                        });
                                    }
                                }
                                className='fa-solid fa-gear cursor-pointer'
                            >
                            </i>
                        </h3>
                        <HolderForm isDisabled={ true } />
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                            <span>Informações da Assinatura</span>
                        </h3>
                        <div className='mt-2'>
                            <TextInput placeholder='Plano Selecionado' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='plan-selected' disabled={ true }/>
                        </div>
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                            <span>Informações do Cartão</span>
                            <i
                                onClick={
                                    () => {
                                        setModalIsOpen(true);
                                        setFormModal({
                                            title: 'Informações do Cartão',
                                            form: <CardForm isDisabled={ false } />,
                                        });
                                    }
                                }
                                className='fa-solid fa-gear cursor-pointer'
                            >
                            </i>
                        </h3>
                        <CardForm isDisabled={ true } />
                    </CompanyEditCard>
                </div>
            </div>
            {
                modalIsOpen && (
                    <FormModal handleClose={ () => setModalIsOpen(false) } handleConfirm={ () => {} } title={ formModal.title || '' }>
                        { formModal.form }
                    </FormModal>
                )
            }
        </CompanyDefault>
    );
}

interface FormInterface {
    isDisabled: boolean,
}

const CompanyForm:React.FC<FormInterface> = ({ isDisabled }) => {
    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <form className='mt-2'>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Razão Social' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-name' disabled={ isDisabled }/>
                <TextInput placeholder='CNPJ' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-cnpj' disabled={ isDisabled } />
            </div>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='company-email' disabled={ isDisabled }/>
                <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='company-phone' disabled={ isDisabled }/>
            </div>
            <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-address' disabled={ isDisabled }/>
        </form>
    );
}

const HolderForm:React.FC<FormInterface> = ({ isDisabled }) => {
    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <form className='mt-2'>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Nome do Titular' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='holder-name' disabled={ isDisabled }/>
                <TextInput placeholder='CPF' type={ InputTypesEnum.text } size='medium' consultPackage={ viewConsultPackage } name='holder-cpf' disabled={ isDisabled }/>
            </div>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='holder-email' disabled={ isDisabled }/>
                <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='holder-phone' disabled={ isDisabled }/>
            </div>
        </form>
    );
}

const CardForm:React.FC<FormInterface> = ({ isDisabled }) => {
    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <form className='mt-2'>
            <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-owner' disabled={ isDisabled }/>
            <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-number' disabled={ isDisabled }/>
            
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-expiration' disabled={ isDisabled }/>
                <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-code' disabled={ isDisabled }/>
                <SelectInput placeholder='Bandeira' options={ [] } size='small' consultPackage={ viewConsultPackage } name='card-type' disabled={ isDisabled }/>
            </div>
        </form>
    );
}

export default CompanyProfile;
