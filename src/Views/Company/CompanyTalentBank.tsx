import TalentBankCard from '../../Components/Cards/TalentBankCard';
import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import FormModal from '../../Components/Modals/FormModal';
import InputTypesEnum from '../../Utils/InputTypesEnum';
import TextInput from '../../Components/Inputs/TextInput';

const CompanyTalentBank = () => {
    useEffect((): void => {
        window.document.title = 'Banco de Talentos';
    });

    const [allFolders, setAllFolders] = useState<FoldersInterface>([]);
    const [folders, setFolders] = useState<FoldersInterface>([]);

    useEffect((): void => {
        setAllFolders([
            {
                title: 'Pasta X',
            },
            {
                title: 'Pasta Y',
            },
            {
                title: 'Pasta Z',
            },
            {
                title: 'Pasta W',
            },
            {
                title: 'Pasta T',
            },
        ]);
    }, []);

    useEffect((): void => {
        filterFolders(searchFolders);
    }, [allFolders]);

    interface FoldersInterface {
        [key: number] : {
            title: string;
        }

        [Symbol.iterator] : () => IterableIterator<{
            title: string;
        }>;

        filter(arg0: (folder: { title: string; }) => boolean): import("react").SetStateAction<FoldersInterface>;
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [folderName, setFolderName] = useState('');

    const consultPackage = {
        getValue: () => { return folderName },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFolderName(e.target.value) },
    };

    const handleConfirm = () => {
        setAllFolders([...allFolders, { title: folderName }]);
        setModalIsOpen(false);
        setFolderName('');
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setFolderName('');
    }

    const [searchFolders, setSearchFolders] = useState('');

    const filterFolders = (value : string) => {
        if(value.length === 0) {
            setFolders(allFolders);
            return;
        }

        setFolders(allFolders.filter((folder : { title : string}) => folder.title.toLowerCase().includes(value.toLowerCase())));
    }

    useEffect((): void => {
        filterFolders(searchFolders);
    }, [searchFolders]);

    return (
        <CompanyDefault>
            <div className='p-5'>
                <h1 className='text-2xl'>Banco de Talentos</h1>
                <div className='w-full flex items-center justify-between mt-5'>
                    <input onChange={ (e) => setSearchFolders(e.target.value) } type='text' placeholder='Buscar' className='max-w-sm w-full mr-3 px-2 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                    <button onClick={ () => setModalIsOpen(true) } className='bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
                <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {
                        [
                            ...folders,
                        ].map((card, key) => {
                            return (
                                <TalentBankCard card={ card } key={ key } />
                            );
                        })
                    }
                </div>
            </div>

            {
                modalIsOpen && (
                    <FormModal handleClose={ handleCloseModal } handleConfirm={ handleConfirm } title='Nova Pasta'>
                        <div className='my-2'>
                            <TextInput type={ InputTypesEnum.text } placeholder='Nome da Pasta' name='folder-name' id='folder-name' consultPackage={ consultPackage } />
                        </div>
                    </FormModal>
                )
            }
        </CompanyDefault>
    );
}

export default CompanyTalentBank;
