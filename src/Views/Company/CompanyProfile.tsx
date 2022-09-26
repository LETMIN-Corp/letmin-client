import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import CompanyEditCard from '../../Components/Cards/CompanyEditCard';
import TextInput from '../../Components/Inputs/TextInput';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';

class Company {
    company: object = {
        name: '',
        cnpj: '',
        email: '',
        phone: '',
        address: '',
    };
    holder: object = {
        name: '',
        cpf: '',
        email: '',
        phone: '',
    };
    plan: object = {
        selected: '',
    };
    card: object = {
        type: '',
        number: '',
        code: '',
        expiration: '',
        owner: '',
    };
    [key: string]: any;
}

interface CanEdit {
    [key: string]: boolean;
}

const CompanyProfile = () => {
    const company = useCompany();
    const { loading } = useLoading();

    const [companyData, setCompanyData] = useState<Company>(new Company);
    const [canEdit, setCanEdit] = useState<CanEdit>({
        company: false,
        holder: false,
        plan: false,
        card: false,
    });

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

    function getInputValue (name: string): string {
        const [type, data] = name.split('-'); //company-name  -> company  name

        return companyData[type][data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setCompanyData({
                ...companyData,
                [type]: { ...companyData[type], [data]: value
            }
        });
    }

    function updateCompanyData()
    {
        company.updateCompanyData(companyData);
        flipEdit('company');
    }

    function updateHolderData()
    {
        company.updateHolderData(companyData);
        getDBCompanyData();
        flipEdit('holder');
    }

    function cancelUpdate(property: string)
    {
        getDBCompanyData();
        flipEdit(property);
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    }

    function flipEdit(property: string)
    {
        setCanEdit({
            ...canEdit,
            [property]: !canEdit[property],
        });
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
                                        onClick={ () => flipEdit('company') }
                                        className='cursor-pointer'
                                        icon={ faGear }
                                    />
                                </h3>
                                <CompanyForm consultPackage={ consultPackage } canEdit={ canEdit['company'] } cancelUpdate={ () => cancelUpdate('company') } updateData={ updateCompanyData } />
                            </CompanyEditCard>
                            <CompanyEditCard>
                                <h3 className='text-dark-purple text-lg md:text-xl flex items-center w-full justify-between'>
                                    <span>Informações do Titular</span>
                                    <FontAwesomeIcon
                                        onClick={ () => flipEdit('holder') }
                                        className='cursor-pointer'
                                        icon={ faGear }
                                    />
                                </h3>
                                <HolderForm consultPackage={ consultPackage } canEdit={ canEdit['holder'] } cancelUpdate={ () => cancelUpdate('holder') } updateData={ updateHolderData } />
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
                                <CardForm consultPackage={ consultPackage } canEdit={ true } cancelUpdate={ () => cancelUpdate('card') } />
                            </CompanyEditCard>
                        </div>
                    )
                }
            </div>
        </CompanyDefault>
    );
}

interface FormInterface {
    canEdit: boolean,
    consultPackage: {
        getValue: (name: string) => string,
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    },
    cancelUpdate: () => void,
    updateData?: () => void,
}

const CompanyForm:React.FC<FormInterface> = ({ canEdit, consultPackage, cancelUpdate, updateData }) => {
    return (
        <>
            <form className='mt-2'>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Razão Social' size='large' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-name' disabled={ !canEdit }/>
                    <TextInput placeholder='CNPJ' size='medium' useMask={ MaskTypesEnum.cnpj } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-cnpj' disabled={ !canEdit } />
                </div>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='company-email' disabled={ !canEdit }/>
                    <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='company-phone' disabled={ !canEdit }/>
                </div>
                <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-address' disabled={ !canEdit }/>
            </form>
            {
                canEdit && (
                    <>
                    <div className='flex justify-end w-full'>
                        <button onClick={ cancelUpdate } className='bg-gray text-black w-2/12 min-w-sm py-2 rounded-md'>Cancelar</button>
                        <button onClick={ updateData } className='bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2'>Salvar</button>
                    </div>
                    </>
                )
            }
        </>
    );
}

const HolderForm:React.FC<FormInterface> = ({ canEdit, consultPackage, cancelUpdate, updateData }) => {
    return (
        <>
        <form className='mt-2'>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Nome do Titular' size='large' useMask={ MaskTypesEnum.holder } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='holder-name' disabled={ !canEdit }/>
                <TextInput placeholder='CPF' useMask={ MaskTypesEnum.cpf } type={ InputTypesEnum.text } size='medium' consultPackage={ consultPackage } name='holder-cpf' disabled={ !canEdit }/>
            </div>
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='holder-email' disabled={ !canEdit }/>
                <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='holder-phone' disabled={ !canEdit }/>
            </div>
        </form>
        
        {
            
            canEdit && (
                <>
                <div className='flex justify-end w-full'>
                    <button onClick={ cancelUpdate } className='bg-gray text-black w-2/12 min-w-sm py-2 rounded-md'>Cancelar</button>
                    <button onClick={ updateData } className='bg-primary text-white w-2/12 min-w-sm py-2 rounded-md ml-2'>Salvar</button>
                </div>
                </>
            )
        }
        </>
    );
}

const CardForm:React.FC<FormInterface> = ({ canEdit, consultPackage }) => {
    return (
        <form className='mt-2'>
            <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-owner' disabled={ canEdit }/>
            <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-number' disabled={ canEdit }/>
            
            <div className='md:flex justify-between w-full'>
                <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-expiration' disabled={ canEdit }/>
                <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-code' disabled={ canEdit }/>
                <TextInput placeholder='Bandeira' size='small' type={ InputTypesEnum.text }  consultPackage={ consultPackage } name='card-type' disabled={ canEdit }/>
            </div>
        </form>
    );
}

export default CompanyProfile;
