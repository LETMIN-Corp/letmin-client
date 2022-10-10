import { faTriangleExclamation, faMagnifyingGlass, faTrash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AdminDefault from './AdminDefault';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';

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
    const [searchComplaint, setSearchComplaint] = useState('');
    
    const [allComplaints, setAllComplaints] = useState<IComplaint[]>([]);
    const [complaints, setComplaints] = useState<IComplaint[]>([])
    const [currentComplaint, setCurrentComplaint] = useState(0);

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

    const filterComplaints = (value: string) => {
        if (value.length === 0) {
            return setComplaints(allComplaints);
        }

        let filteredComplaints = allComplaints.filter((complaint) => {
            return complaint.description.toLowerCase().includes(value.toLowerCase()) 
                || complaint.reason.toLowerCase().includes(value.toLowerCase())
                || complaint.envoy.name.toLowerCase().includes(value.toLowerCase())
                || complaint.target.name.toLowerCase().includes(value.toLowerCase());
        });
        setComplaints(filteredComplaints);
    }
    useEffect((): void => {
        window.document.title = 'Letmin - Denúncias';

        admin.getAllComplaints().then((res: any) => {
            if(res.status !== 200 || !res.data.success) {
                setAllComplaints([]);
                setComplaints([]);
                return admin.dispatchError(res.data.message);
            }

            setAllComplaints(res.data.complaints);
            setComplaints(res.data.complaints);
            return;
        });
    }, []);

    useEffect((): void => {
        filterComplaints(searchComplaint);
    }, [searchComplaint]);

    return (
        <AdminDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faTriangleExclamation } className='mr-2' />
                    Denúncias
                </h1>
                <div className='max-w-sm w-full relative mt-5'>
                    <input type='text' placeholder='Buscar' className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' onChange={(e) => setSearchComplaint(e.target.value)} id='search' />
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                </div>
                {
                    loading ? <Loading /> : 
                    complaints.length == 0 ? (
                        <div className='mt-5 text-center md:text-left text-dark-purple text-lg font-medium'>Nenhuma denúncia encontrada</div>
                    ) :
                    (
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
                    )
                }
            </div>
            {
                ModalIsOpen && (
                    <ConfirmationModal
                        title='Excluir Denúncia'
                        text='Tem certeza que deseja excluir essa denúncia?'
                        handleClose={ () => setModalIsOpen(false) }
                        handleConfirm={ () => handleRemoveComplaint(complaints[currentComplaint]._id) }
                    />
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
            <span className='w-4/12 pr-1'>
                <Link className='font-medium text-primary hover:text-bright-purple' to={ `/admin/combinations/${complaint.target._id}` }>
                    { complaint.target.name }
                </Link>
            </span>
            <span className='w-8/12 pr-1'>{ complaint.description }</span>
            <span className='w-4/12 pr-1'>{ complaint.pending ? 'Pendente' : 'Resolvida' }</span>
            <span className='w-2/12 pr-1 flex justify-between'>
                <div className='cursor-pointer'>
                    <FontAwesomeIcon 
                        className={
                            complaint.pending ?
                            'text-green text-center w-6 h-6' :
                            'text-red text-center w-6 h-6'
                        }
                        icon={ complaint.pending ? faCheck : faXmark } 
                        onClick={ changeStatus } 
                    />
                </div>
                <div className='cursor-pointer' onClick={ openModal }>
                    <FontAwesomeIcon icon={ faTrash } className='text-bold-purple h-6' />
                </div>
            </span>
        </div>
    );
}

export default AdminComplaint;
