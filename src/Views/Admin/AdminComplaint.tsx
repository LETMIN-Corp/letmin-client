import { useEffect } from 'react';
import AdminDefault from './AdminDefault';

const AdminComplaint : React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Denúncias';
    }, []);

    return (
        <AdminDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                    Denúncias
                </h1>
                <div className='w-full flex items-center justify-between mt-5'>
                    <input type='text' placeholder='Buscar' className='max-w-sm w-full md:mr-3 px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
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
