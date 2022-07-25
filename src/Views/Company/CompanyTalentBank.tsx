import TalentBankCard from '../../Components/Cards/TalentBankCard';
import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import FormModal from '../../Components/Modals/FormModal';
import InputTypesEnum from '../../Utils/InputTypesEnum';
import TextInput from '../../Components/Inputs/TextInput';

const CompanyTalentBank = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Banco de Talentos';
    }, []);

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

        length: number;

        filter(arg0: (folder: { title: string; }) => boolean): import("react").SetStateAction<FoldersInterface>;
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [folderName, setFolderName] = useState('');

    const consultPackage = {
        getValue: () => { return folderName },
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => { setFolderName(e.target.value) },
    };

    const handleConfirm = () => {
        setModalIsOpen(false);
        if(folderName.length === 0) {
            return;
        }
        setAllFolders([...allFolders, { title: folderName }]);
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
                <h1 className='text-2xl'>
                    <i className='fa-solid fa-folder-open mr-2'></i>
                    <span>Banco de Talentos</span>
                </h1>
                <div className='w-full flex items-center justify-between mt-5'>
                    <div className='max-w-sm w-full relative mr-2'>
                        <input onChange={ (e) => setSearchFolders(e.target.value) } type='text' placeholder='Buscar' className='w-full mr-3 pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md' name='search' id='search' />
                        <i className='fa-solid fa-magnifying-glass absolute right-2 top-1 text-xl text-dark-purple'></i>
                    </div>
                    <button onClick={ () => setModalIsOpen(true) } className='bg-primary w-10 h-10 rounded-md text-white hover:bg-dark-purple ease-out duration-200'>
                        <i className='fa-solid fa-plus'></i>
                    </button>
                </div>
                {
                    folders.length === 0 && (
                        <div className='mt-5 text-center md:text-left text-dark-purple text-lg font-medium'>Nenhuma pasta encontrada</div>
                    )
                }
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
                    <FormModal handleClose={ handleCloseModal } handleConfirm={ handleConfirm } title='Adicionar Pasta'>
                        <div className='my-2'>
                            <TextInput type={ InputTypesEnum.text } placeholder='Nome' name='folder-name' id='folder-name' consultPackage={ consultPackage } />
                        </div>
                    </FormModal>
                )
            }
        </CompanyDefault>
    );
}

export default CompanyTalentBank;
