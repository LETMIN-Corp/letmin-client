import { faTriangleExclamation, faMagnifyingGlass, faTrash, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AdminDefault from './AdminDefault';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';
import FormModal from '../../Components/Modals/FormModal';
import { Link } from 'react-router-dom';

interface IComplaint {
    _id: string;
    description: string;
    reason: string;
    envoy: {
        _id: string;
        name: string;
        role: string;
    }
    target: {
        _id: string;
        name: string;
        role: string;
    }
    pending: boolean;
}

const AdminComplaint : React.FC = () => {
    const admin = useAdmin();
    const { loading } = useLoading();
    
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [currentComplaint, setCurrentComplaint] = useState(0);
    const [complaints, setComplaints] = useState<[IComplaint]>([
        {
            _id: '',
            description: '',
            reason: '',
            envoy: {
                _id: '',
                name: '',
                role: '',
            },
            target: {
                _id: '',
                name: '',
                role: '',
            },
            pending: false,
        }
    ])

    function handleCheckComplaint(id: string) {
        admin.changeComplaintStatus(id).then((res: any) => {
            if (res.data.success && res.status === 200) {
                const newComplaints : any = complaints.map((complaint) => {
                    if (complaint._id === id) {
                        complaint.pending = !complaint.pending;
                    }
                    return complaint;
                });
                setComplaints(newComplaints)
                admin.dispatchSuccess(res.data.message);
            }
        });
        setModalIsOpen(false);
    }

    function handleRemoveComplaint(id: string) {
        admin.removeComplaint(id).then((res: any) => {
            if (res.data.success && res.status === 200) {
                const newComplaints : any = complaints.filter((complaint) => complaint._id !== id);
                setComplaints(newComplaints)
                admin.dispatchSuccess(res.data.message);
                setModalIsOpen(false);
            }
        });
    }

    useEffect((): void => {
        window.document.title = 'Letmin - Denúncias';

        admin.getAllComplaints().then((res: any) => {
            if (res.data.success && res.status === 200) {
                setComplaints(res.data.complaints);
            }
        });
    }, []);
    return (
        <AdminDefault>
            {
                loading ? <Loading /> : (
                    <div className='p-5 min-h-90'>
                        <h1 className='text-2xl'>
                            <FontAwesomeIcon icon={ faTriangleExclamation } className='mr-2' />
                            Denúncias
                        </h1>
                        <div className='max-w-sm w-full relative mt-5'>
                            <input type='text' placeholder='Buscar' className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                            <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                        </div>
                        {
                            complaints.length > 0 ? (
                                <div className='mt-5 break-all'>
                                    <div className='text-sm md:text-md font-medium flex justify-between w-full px-1'>
                                        <span className='w-4/12 pr-1'>Emissário</span>
                                        <span className='w-4/12 pr-1'>Razão Denúncia</span>
                                        <span className='w-4/12 pr-1'>Alvo</span>
                                        <span className='w-8/12 pr-1'>Descrição</span>
                                        <span className='w-4/12 pr-1'>Status</span>
                                        <span className='w-2/12 pr-1'>Ações</span>
                                    </div>
                                    <div>
                                        {
                                            complaints.map((complaint, key) => 
                                                <TableCard 
                                                    key={ key } 
                                                    complaint={ complaint } 
                                                    changeStatus={() => handleCheckComplaint(complaint._id)}
                                                    openModal={() => {
                                                        setModalIsOpen(true);
                                                        setCurrentComplaint(key);
                                                    }}
                                                /> 
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='mt-5'>
                                    <p className='text-center text-xl'>Nenhuma denúncia encontrada</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                ModalIsOpen && (
                    <FormModal
                        title='Excluir Denúncia'
                        handleClose={ () => setModalIsOpen(false) }
                        handleConfirm={ () => handleRemoveComplaint(complaints[currentComplaint]._id) }
                    >
                        <p className='text-center'>Tem certeza que deseja excluir essa denúncia?</p>
                    </FormModal>
                )
            }
        </AdminDefault>
    );
}

interface TableCardInterface {
    complaint: IComplaint;
    openModal: () => void,
    changeStatus: () => void,
};

const TableCard: React.FC<TableCardInterface> = ({ complaint, openModal, changeStatus }) => {
    return (
        <div className='text-sm bg-lilac py-2 px-1 rounded-sm flex items-center justify-between mt-2'>
            <span className='w-4/12 pr-1'>{ complaint.envoy.name }</span>
            <span className='w-4/12 pr-1'>{ complaint.reason }</span>
            <Link 
                className='w-4/12 pr-1 text-dark-purple hover:text-purple-600'
                to={ complaint.target.role === 'User' ? `/profile/${complaint.target._id}` : `/company/${complaint.target._id}` }
            >
                { complaint.target.name }
            </Link>
            <span className='w-8/12 pr-1'>{ complaint.description }</span>
            <span className='w-4/12 pr-1'>{ complaint.pending ? 'Pendente' : 'Resolvida' }</span>
            <span className='w-2/12 pr-1 flex justify-between'>
                <div className='cursor-pointer'>
                    <FontAwesomeIcon 
                        className='text-dark-purple h-6' 
                        icon={ complaint.pending ? faCheckCircle : faTimesCircle } 
                        onClick={ changeStatus } 
                    />
                </div>
                <div className='cursor-pointer' onClick={ openModal }>
                    <FontAwesomeIcon icon={ faTrash } className='text-dark-purple h-6' />
                </div>
            </span>
        </div>
    );
}

export default AdminComplaint;
