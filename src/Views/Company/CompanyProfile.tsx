import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import CompanyEditCard from '../../Components/Cards/CompanyEditCard';
import TextInput from '../../Components/Inputs/TextInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import FormModal from '../../Components/Modals/FormModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';

const CompanyProfile = () => {
    const company = useCompany();
    const { loading } = useLoading();

    const [companyData, setCompanyData] = useState<CompanyData>([]); 

    function getDBCompanyData()
    {
        company.getCompanyData()
        .then((res: any) => {
            if (res.status !== 200) {
                company.dispatchError('Erro ao carregar dados');
                return;
            }
            setCompanyData(res.data.data);  
        })
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Meus Dados';
        getDBCompanyData();
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


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formModal, setFormModal] = useState<FormModalInterface>({});
    const [companyBlockedEdition, setCompanyBlockedEdition] = useState(true);
    const [holderBlockedEdition, setHolderBlockedEdition] = useState(true);
    const [clickCompanyEdition, setClickCompanyEdition] = useState(false);
    const [clickHolderEdition, setClickHolderEdition] = useState(false);

    function getInputValue (name: string): string {
        const [type, data] = name.split('-');

        if(companyData.length === 0) {
            return '';
        }

        return companyData[type][data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        if(companyBlockedEdition == true && holderBlockedEdition == true)
        {
            return;
        }        

        setCompanyData({
                ...companyData,
                [type]: { ...companyData[type], [data]: value
            }
        });
    }

    function enableCompany()
    {
        if(!clickCompanyEdition)
        {
            setCompanyBlockedEdition(false);
            setClickCompanyEdition(true);
        }
        else
        {
            setCompanyBlockedEdition(true);
            getDBCompanyData();
            setClickCompanyEdition(false);
        }
    }

    function enableHolder()
    {
        if(!clickHolderEdition)
        {
            setHolderBlockedEdition(false);
            setClickHolderEdition(true);
        }
        else
        {
            setHolderBlockedEdition(true);
            getDBCompanyData();
            setClickHolderEdition(false);
        }
    }

    function updateCompanyData()
    {
        company.updateCompanyData(companyData);
        enableCompany();
    }

    function updateHolderData()
    {
        company.updateHolderData(companyData);
        enableHolder();
    }


    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    }

    
    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faAddressCard } className='mr-2' />
                    <span>Meus Dados</span>
                </h1>
                {
                    loading && (
                        <Loading />
                    )
                }
                {
                    !loading && (
                        <div>
                            <CompanyEditCard>
                                <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                                    <span>Informações da Empresa</span>
                                    <FontAwesomeIcon
                                        onClick={ enableCompany }
                                        className='cursor-pointer'
                                        icon={ faGear }
                                    />
                                </h3>
                                <CompanyForm consultPackage={ consultPackage } isDisabled={ companyBlockedEdition } getCompanyData={ getDBCompanyData } updateData={ updateCompanyData } />
                            </CompanyEditCard>
                            <CompanyEditCard>
                                <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                                    <span>Informações do Titular</span>
                                    <FontAwesomeIcon
                                        onClick={ enableHolder }
                                        className='cursor-pointer'
                                        icon={ faGear }
                                    />
                                </h3>
                                <HolderForm consultPackage={ consultPackage } isDisabled={ holderBlockedEdition } getCompanyData={ getDBCompanyData } updateData={ updateHolderData } />
                            </CompanyEditCard>
                            <CompanyEditCard>
                                <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                                    <span>Informações da Assinatura</span> 
                                </h3>
                                <div className='mt-2'>
                                    <TextInput placeholder='Plano Selecionado' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='plan-selected' disabled={ true }/>
                                </div>
                            </CompanyEditCard>
                            <CompanyEditCard>
                                <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                                    <span>Informações do Cartão</span>
                                </h3>
                                <CardForm consultPackage={ consultPackage } isDisabled={ true } getCompanyData={getDBCompanyData} />
                            </CompanyEditCard>
                        </div>
                    )
                }
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
    consultPackage: {
        getValue: (name: string) => string,
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    },
    getCompanyData: () => void,
    updateData?: () => void,
}

const CompanyForm:React.FC<FormInterface> = ({ isDisabled, consultPackage, getCompanyData, updateData }) => {
    
    const company = useCompany();

    return (
        <>
            <form className='mt-2'>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Razão Social' size='large' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-name' disabled={ isDisabled }/>
                    <TextInput placeholder='CNPJ' size='medium' useMask={ MaskTypesEnum.cnpj } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-cnpj' disabled={ isDisabled } />
                </div>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='company-email' disabled={ isDisabled }/>
                    <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='company-phone' disabled={ isDisabled }/>
                </div>
                <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-address' disabled={ isDisabled }/>
            </form>
            {
                (isDisabled === false) && (
                    <>
                    <div className='flex justify-end w-full'>
                        <button onClick={ getCompanyData } className='bg-gray text-black w-2/12 min-w-sm py-2 rounded-md'>Cancelar</button>
                        <button onClick={ updateData } className='bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2'>Salvar</button>
                    </div>
                    </>
                )
            }
        </>
    );
}

const HolderForm:React.FC<FormInterface> = ({ isDisabled, consultPackage, getCompanyData, updateData }) => {
    return (
        <>
        <form className='mt-2'>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Nome do Titular' size='large' useMask={ MaskTypesEnum.holder } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='holder-name' disabled={ isDisabled }/>
                <TextInput placeholder='CPF' useMask={ MaskTypesEnum.cpf } type={ InputTypesEnum.text } size='medium' consultPackage={ consultPackage } name='holder-cpf' disabled={ isDisabled }/>
            </div>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='holder-email' disabled={ isDisabled }/>
                <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='holder-phone' disabled={ isDisabled }/>
            </div>
        </form>
        
        {
            
            (isDisabled === false) && (
                <>
                <div className='flex justify-end w-full'>
                    <button onClick={ getCompanyData } className='bg-gray text-black w-2/12 min-w-sm py-2 rounded-md'>Cancelar</button>
                    <button onClick={ updateData } className='bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2'>Salvar</button>
                </div>
                </>
            )
        }
        </>
    );
}

const CardForm:React.FC<FormInterface> = ({ isDisabled, consultPackage }) => {
    return (
        <form className='mt-2'>
            <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-owner' disabled={ isDisabled }/>
            <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-number' disabled={ isDisabled }/>
            
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-expiration' disabled={ isDisabled }/>
                <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-code' disabled={ isDisabled }/>
                <TextInput placeholder='Bandeira' size='small' type={ InputTypesEnum.text }  consultPackage={ consultPackage } name='card-type' disabled={ isDisabled }/>
            </div>
        </form>
    );
}

export default CompanyProfile;
