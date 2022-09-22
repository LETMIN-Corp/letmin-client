import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import CompanyEditCard from '../../Components/Cards/CompanyEditCard';
import TextInput from '../../Components/Inputs/TextInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import SelectInput from '../../Components/Inputs/SelectInput';
import FormModal from '../../Components/Modals/FormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';



const CompanyProfile = () => {
    const company = useCompany();

    const [companyData, setCompanyData] = useState<CompanyData>([]); 
    const [companyDataEdition, setCompanyDataEdition] = useState<CompanyDataEdition>([]); 

    useEffect((): void => {
        window.document.title = 'Letmin - Meus Dados';

        company.getCompanyData()
        .then((res: any) => {
            if (res.status !== 200) {
                company.dispatchError('Erro ao carregar dados');
                return;
            }            
        });
    }, []);

    interface FormModalInterface {
        title?: string,
        form?: JSX.Element,
    }

    interface Company {
        company: {
            name: string,
            cnpj: string,
            email: string,
            phone: string,
            address: string,
        },
        holder: {
            name: string,
            cpf: string,
            email: string,
            phone: string,
        },
        plan: {
            selected: string,
        },
        card: {
            type: string,
            number: string,
            code: string,
            expiration: string,
            owner: string,
        },
    }
    
    interface CompanyData {
        [key: number]: Company;
        length: number;
    }

    interface CompanyDataEdition {
        [key: number]: Company;
        length: number;
    }


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formModal, setFormModal] = useState<FormModalInterface>({});

    function getInputValue (name: string): string {
        const [type, data] = name.split('-'); //company-name  -> company  name

        if(companyData.length === 0) {
            return '';
        }
        console.log(companyData[type][data]);

        return companyData[type][data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setCompanyDataEdition({
                ...companyDataEdition,
                [type]: { ...companyDataEdition[type], [data]: value
            }
        });
    }

    const consultPackage = {
        getValue: () : string => { return '' },
        setValue: setInputValue,
    }

    const viewConsultPackage = {
        getValue: getInputValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => {}
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
                            <FontAwesomeIcon
                                onClick={
                                    () => {
                                        setModalIsOpen(true);
                                        setFormModal({
                                            title: 'Informações da Empresa',
                                            form: <CompanyForm viewConsultPackage={ consultPackage } isDisabled={ false } />,
                                        });
                                    }
                                }
                                className='cursor-pointer'
                                icon={ faGear }
                            />
                        </h3>
                        <CompanyForm viewConsultPackage={ viewConsultPackage } isDisabled={ true } />
                    </CompanyEditCard>
                    <CompanyEditCard>
                        <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                            <span>Informações do Titular</span>
                            <FontAwesomeIcon
                                onClick={
                                    () => {
                                        setModalIsOpen(true);
                                        setFormModal({
                                            title: 'Informações do Titular',
                                            form: <HolderForm viewConsultPackage={ consultPackage } isDisabled={ false } />,
                                        });
                                    }
                                }
                                className='cursor-pointer'
                                icon={ faGear }
                            />
                        </h3>
                        <HolderForm viewConsultPackage={ viewConsultPackage } isDisabled={ true } />
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
                        </h3>
                        <CardForm viewConsultPackage={ viewConsultPackage } isDisabled={ true } />
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
    viewConsultPackage: {
        getValue: (name: string) => string,
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    },
}

const CompanyForm:React.FC<FormInterface> = ({ isDisabled, viewConsultPackage }) => {
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

const HolderForm:React.FC<FormInterface> = ({ isDisabled, viewConsultPackage }) => {

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

const CardForm:React.FC<FormInterface> = ({ isDisabled, viewConsultPackage }) => {
    return (
        <form className='mt-2'>
            <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-owner' disabled={ isDisabled }/>
            <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-number' disabled={ isDisabled }/>
            
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-expiration' disabled={ isDisabled }/>
                <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-code' disabled={ isDisabled }/>
                <TextInput placeholder='Bandeira' size='small' type={ InputTypesEnum.text }  consultPackage={ viewConsultPackage } name='card-type' disabled={ isDisabled }/>
            </div>
        </form>
    );
}

export default CompanyProfile;
