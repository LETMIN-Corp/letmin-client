import UserDefault from './UserDefault';
//import CombinationData from '../../Components/Items/CombinationsData';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';

const UserCombination = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Combinações';
    }, []);

    const data = [
        {
            name: 'Netflix',
            vacancy: 'Tipo 1',
        },
        {
            name: 'Nike',
            vacancy: 'Tipo 2',
        },
        {
            name: 'Puma',
            vacancy: 'Tipo 3',
        },
        {
            name: 'Disney',
            vacancy: 'Tipo 4',
        },
        {
            name: 'Adidas',
            vacancy: 'Tipo 5',
        },
        {
            name: 'Crefisa',
            vacancy: 'Tipo 6',
        },
        {
            name: 'Samsung',
            vacancy: 'Tipo 7',
        },
    ];

    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <UserDefault>
            <div className="p-5 min-h-90">
                <h1 className='text-2xl text-dark-purple font-medium'>
                    <FontAwesomeIcon icon={ faHandshake } className='mr-2' />
                    <span>Combinações</span>
                </h1>
                {
                    data.length > 0 && (
                        <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                            <div className='flex text-xl font-medium'>
                                <div className='w-4/12 flex justify-center'>
                                    Empresas
                                </div>
                                <div className='w-4/12 flex justify-center text-center'>
                                    Tipos de Vaga
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Ações
                                </div>
                            </div>
                            <div>
                                {
                                    //data.map((row, key) => <CombinationData key={ key } name={ row.name } vacancy={ row.vacancy } handleClick={ () => setModalIsOpen(true) } />)
                                }
                            </div>
                        </div>
                    )
                }

            {
                modalIsOpen && (
                    <ConfirmationModal handleClose={ () => setModalIsOpen(false) } handleConfirm={ () => {} } title='Confirmar' text='Deseja confirmar a remoção desta vaga?'>
                    
                    </ConfirmationModal>
                )
            }

                        

            </div>
        </UserDefault>
    );
}

export default UserCombination;
