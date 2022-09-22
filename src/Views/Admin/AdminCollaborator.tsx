import { faBan, faInfo, faMessage, faUnlock, faUsers, faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import TextInput from '../../Components/Inputs/TextInput';
import InfoModal from '../../Components/Modals/InfoModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import AdminDefault from './AdminDefault';
import useAdmin from '../../Utils/useAdmin';

const AdminCollaborator : React.FC = () => {
    const admin = useAdmin();
    const [users, setUsers] = useState([]);
    const [selectedUserKey, setSelectedUserKey] = useState(0);

    useEffect((): void => {
        window.document.title = 'Letmin - Colaboradores';

        admin.getAllUsers().then((res: any) => {
            setUsers(res.data.users);
        });
    }, []);

    const [openModal, setOpenModal] = useState(false);

    function handleUserBlock(id: string) : void {
        admin.blockUser(id).then((res: any) => {
            setUsers(res.data.users);
        });
    }

    return (
        <AdminDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faUsers } className='mr-2' />
                    Colaboradores
                </h1>
                <div className='max-w-sm w-full relative mt-5'>
                    <input type='text' placeholder='Buscar' className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                </div>
                <div className='mt-5 break-all'>
                    <div className='text-sm md:text-md font-medium flex justify-between w-full px-1'>
                        <span className='w-5/12 md:w-7/12 pr-1'>Nome</span>
                        <span className='w-4/12 pr-1'>Status</span>
                        <span className='w-3/12 md:w-12 pr-1'>Ações</span>
                    </div>
                    <div>
                        {   // @ts-ignore
                            users.map((collaborator, key) => <TableCard key={ key } collaborator={ collaborator } handleOpen={ () => setOpenModal(true) } handleUserBlock={ () => handleUserBlock(collaborator._id) } /> )
                        }
                    </div>
                </div>
            </div>
            {
                openModal && <CollaboratorForm isDisabled={ false } handleClose={ () => setOpenModal(false) } />
            }
        </AdminDefault>
    );
}

interface TableCardInterface {
    collaborator: {
        name: string,
        blocked: boolean,
    },
    handleOpen: () => void,
    handleUserBlock: () => void,
};

const TableCard: React.FC<TableCardInterface> = ({ collaborator, handleOpen, handleUserBlock }) => {
    return (
        <div className='text-sm bg-lilac py-2 px-1 rounded-sm flex items-center justify-between mt-2'>
            <span className='w-5/12 md:w-7/12 pr-1'>{ collaborator.name }</span>
            <span className='w-4/12 pr-1'>{ collaborator.blocked ? 'Bloqueado' : 'Ativo' }</span>
            <span className='w-2/12 md:w-12 md:text-lg pr-1 flex justify-between'>
                <div className='cursor-pointer'>
                    <FontAwesomeIcon icon={ faInfo } onClick={ handleOpen } className='text-dark-purple' />
                </div>
                <div className='cursor-pointer' onClick={() => handleUserBlock()}>
                    { collaborator.blocked ? <FontAwesomeIcon icon={ faBan } className='text-red' /> : <FontAwesomeIcon icon={ faUnlock } className='text-primary' /> }
                </div>
            </span>
        </div>
    );
}

interface CollaboratorFormInterface {
    isDisabled: boolean,
    handleClose: () => void,
}

const CollaboratorForm:React.FC<CollaboratorFormInterface> = ({ isDisabled, handleClose }) => {
    const viewConsultPackage = {
        getValue: () : string => { return '' },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    return (
        <InfoModal title='Informações' handleClose={ handleClose } showIcon={ false }>
            <h2 className='text-lg'>Colaborador</h2>
            <form className='mt-2'>
                <TextInput placeholder='Nome' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='collaborator-name' disabled={ isDisabled }/>
                <div className='md:flex justify-between w-full'>
                    <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='collaborator-email' disabled={ isDisabled }/>
                    <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='collaborator-phone' disabled={ isDisabled }/>
                </div>
            </form>
        </InfoModal>
    );
}

export default AdminCollaborator;
