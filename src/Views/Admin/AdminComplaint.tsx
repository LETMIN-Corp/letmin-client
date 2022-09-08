import { faTriangleExclamation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import AdminDefault from './AdminDefault';

const AdminComplaint : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Denúncias';
    }, []);

    return (
        <AdminDefault>
            <div className='p-5 min-h-90'>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faTriangleExclamation } className='mr-2' />
                    Denúncias
                </h1>
                <div className='max-w-sm w-full relative mt-5'>
                    <input type='text' placeholder='Buscar' className='w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                    <FontAwesomeIcon icon={ faMagnifyingGlass } className='absolute right-2 top-2 text-xl text-dark-purple' />
                </div>
                <div className='mt-5 break-all'>
                    <div className='text-sm md:text-md font-medium flex justify-between w-full px-1'>
                        <span className='w-4/12 pr-1'>Emissário</span>
                        <span className='w-8/12 pr-1'>Denúncia</span>
                    </div>
                    <div>
                        {
                            [
                                {
                                    emissary: 'Pedro',
                                    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ipsum blanditiis ratione ut eveniet quaerat eum, at quam dolore ad sint sit enim reiciendis libero delectus suscipit, aliquam, ipsam odit.',
                                },
                                {
                                    emissary: 'Paulo hausudsia',
                                    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ipsum blanditiis ratione ut eveniet quaerat eum, at quam dolore ad sint sit enim reiciendis libero delectus suscipit, aliquam, ipsam odit.',
                                },
                            ].map((complaint, key) => <TableCard key={ key } complaint={ complaint } /> )
                        }
                    </div>
                </div>
            </div>
        </AdminDefault>
    );
}

interface TableCardInterface {
    complaint: {
        emissary: string,
        description: string,
    },
};

const TableCard: React.FC<TableCardInterface> = ({ complaint }) => {
    return (
        <div className='text-sm bg-lilac py-2 px-1 rounded-sm flex items-center justify-between mt-2'>
            <span className='w-4/12 pr-1'>{ complaint.emissary }</span>
            <span className='w-8/12 pr-1'>{ complaint.description }</span>
        </div>
    );
}

export default AdminComplaint;
