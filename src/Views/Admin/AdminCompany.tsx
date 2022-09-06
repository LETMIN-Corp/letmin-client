import React, { useEffect, useState } from 'react';
import TextInput from '../../Components/Inputs/TextInput';
import InfoModal from '../../Components/Modals/InfoModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import AdminDefault from './AdminDefault';
import { useNavigate } from 'react-router-dom';
import { faBan, faBuilding, faInfo, faMessage, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../Utils/useAuth';

const AdminCompany : React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect((): void => {
        window.document.title = 'Letmin - Empresas';
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <AdminDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faBuilding } className='mr-2' />
                    Empresas
                </h1>
                <div className='w-full flex items-center justify-between mt-5'>
                    <input type='text' placeholder='Buscar' className='max-w-sm w-full md:mr-3 px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                </div>
                <div className='mt-5 break-all'>
                    <div className='text-sm md:text-md font-medium flex justify-between w-full px-1'>
                        <span className='w-5/12 md:w-7/12 pr-1'>Razão Social</span>
                        <span className='w-4/12 pr-1'>Status</span>
                        <span className='w-3/12 md:w-24 pr-1'>Ações</span>
                    </div>
                    <div>
                        {
                            [
                                {
                                    name: 'Teste bom',
                                    status: true,
                                },
                                {
                                    name: 'Teste ruim',
                                    status: false,
                                },
                            ].map((company, key) => <TableCard key={ key } company={ company } handleOpen={ () => setOpenModal(true) } /> )
                        }
                    </div>
                </div>
            </div>
            {
                openModal && <CompanyForm isDisabled={ false } handleClose={ () => setOpenModal(false) } />
            }
            <button onClick={ auth.signOut } >Logout</button>
        </AdminDefault>
    );
}

interface TableCardInterface {
    company: {
        name: string,
        status: boolean,
    },
    handleOpen: () => void,
};

const TableCard: React.FC<TableCardInterface> = ({ company, handleOpen }) => {
    return (
        <div className='text-sm bg-lilac py-2 px-1 rounded-sm flex items-center justify-between mt-2'>
            <span className='w-5/12 md:w-7/12 pr-1'>{ company.name }</span>
            <span className='w-4/12 pr-1'>{ company.status ? 'Ativo' : 'Bloqueado' }</span>
            <span className='w-3/12 md:w-24 md:text-lg pr-1 flex justify-between'>
                <div className='cursor-pointer'>
                    <FontAwesomeIcon icon={ faInfo } onClick={ handleOpen } className='text-dark-purple' />
                </div>
                <div className='cursor-pointer'>
                    <FontAwesomeIcon icon={ faMessage } className='text-light-purple' />
                </div>
                <div className='cursor-pointer'>
                    { company.status ? <FontAwesomeIcon icon={ faBan } className='text-red' /> : <FontAwesomeIcon icon={ faUnlock } className='text-primary' /> }
                </div>
            </span>
        </div>
    );
}

interface CompanyFormInterface {
    isDisabled: boolean,
    handleClose: () => void,
}

const CompanyForm:React.FC<CompanyFormInterface> = ({ isDisabled, handleClose }) => {
    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <InfoModal title='Informações' handleClose={ handleClose } showIcon={ false }>
            <h2 className='text-lg'>Titular</h2>
            <form className='mt-2'>
                <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='holder-name' disabled={ isDisabled }/>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='holder-email' disabled={ isDisabled }/>
                    <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='holder-phone' disabled={ isDisabled }/>
                </div>
            </form>

            <h2 className='text-lg'>Empresa</h2>
            <form className='mt-2'>
                <TextInput placeholder='Razão Social' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-name' disabled={ isDisabled }/>
                <TextInput placeholder='CNPJ' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-cnpj' disabled={ isDisabled } />
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='holder-email' disabled={ isDisabled }/>
                    <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='holder-phone' disabled={ isDisabled }/>
                </div>
                <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-address' disabled={ isDisabled }/>
            </form>
        </InfoModal>
    );
}

export default AdminCompany;
