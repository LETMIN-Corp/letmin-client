import { faBan, faBuilding, faInfo, faMagnifyingGlass, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';

import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import InfoModal from '../../Components/Modals/InfoModal';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import AdminDefault from './AdminDefault';

const AdminLogs: React.FC = () => {
    const admin = useAdmin();
    const { loading } = useLoading();

    const [searchLog, setSearchLog] = useState('');

    const [allLogs, setAllLogs] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [selectedLogKey, setselectedLogKey] = useState(0);

    useEffect((): void => {
        window.document.title = 'Letmin - Logs';

        admin.getAllLogs().then((res: any) => {
            if (res.status !== 200) {
                return;
            }
            console.log(res.data.logs);
            setAllLogs(res.data.logs);
            setLogs(res.data.logs);
        });
    }, []);

    const [openModal, setOpenModal] = useState(false);

    function handleOpen(key: number): void {
        setselectedLogKey(key);
        setOpenModal(true);
    }

    const filterLogs = (search: string) => {
        if (search == '') {
            return setLogs(allLogs);
        }

        const filteredLogs = allLogs.filter((log: any) => {
            return log.description.toLowerCase().includes(search.toLowerCase());
        });

        setLogs(filteredLogs);
    };

    useEffect((): void => {
        filterLogs(searchLog);
    }, [searchLog]);

    return (
        <AdminDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl">
                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                    Logs do Sistema
                </h1>
                <div className='flex'>
                    <div className="max-w-sm w-full relative mt-5">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md"
                            name="search"
                            onChange={(e) => setSearchLog(e.target.value)}
                            id="search"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="absolute right-2 top-2 text-xl text-dark-purple"
                        />
                    </div>
                    <button
                        disabled={!logs.length}
                        className={!logs.length ? 'hidden' : 'ml-5 bg-gray-400 text-white px-5 py-1 rounded-md'}
                        onClick={() => {
                            admin.deleteAllLogs().then((res: any) => {
                                if (res.status !== 200) {
                                    return;
                                }
                                setAllLogs([]);
                                setLogs([]);
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faBan} className="mr-2" />
                        Deletar todos os logs
                    </button>

                </div>
                {loading ? (
                    <Loading />
                ) : logs.length == 0 ? (
                    <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                        Nenhum Log encontrado
                    </div>
                ) : (
                    <div className="mt-5 break-all">
                        <div className="text-sm md:text-md font-medium flex justify-between w-full px-1">
                            <span className="w-2/12 pr-1">Ação</span>
                            <span className="w-5/12 pr-1">Descrição</span>
                            <span className="w-3/12 pr-1">Data</span>
                            <span className="w-2/12 pr-1">Ações</span>
                        </div>
                        <div>
                            {logs.map((log, key) => (
                                <TableCard
                                    key={key}
                                    log={log}
                                    handleOpen={() => handleOpen(key)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {openModal && (
                <LogForm
                    isDisabled={true}
                    logs={logs}
                    selectedLogKey={selectedLogKey}
                    handleClose={() => setOpenModal(false)}
                />
            )}
        </AdminDefault>
    );
};

interface TableCardInterface {
    log: {
        action: string;
        description: string;
        target: {
            role: string;
            foreignKey: string;
        }
        ip: string;
        userAgent: string;
        createdAt: string;
    };
    handleOpen: () => void;
}

const TableCard: React.FC<TableCardInterface> = ({ log, handleOpen }) => {
    return (
        <div className="text-sm bg-lilac py-2 px-1 md:px-2 rounded-sm flex items-center justify-between mt-2">
            <span className="w-2/12 md:w-2/12 pr-1">{log.action}</span>
            <span className="w-7/12 md:w-7/12 pr-1">
                {log.description}
            </span>
            <span className="w-3/12 pr-1">
                {new Date(log.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <span className="w-2/12 md:w-12 md:text-lg pr-1 flex justify-center">
                <FontAwesomeIcon icon={faInfo} onClick={handleOpen} className="text-dark-purple cursor-pointer" />
            </span>
        </div>
    );
};

interface LogFormInterface {
    isDisabled: boolean;
    logs: [] | any;
    selectedLogKey: number;
    handleClose: () => void;
}

const LogForm: React.FC<LogFormInterface> = ({ isDisabled, logs, selectedLogKey, handleClose }) => {
    const viewConsultPackage = {
        getValue: (name: string) => {
            const [type, data] = name.split('-');
            return logs[selectedLogKey][type][data];
        },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {},
    };

    return (
        <InfoModal title="Informações do Log" handleClose={handleClose} showIcon={false}>
            <h3 className="text-xl font-medium text-dark-purple">Descrição</h3>
            <TextAreaInput
                name="description"
                disabled={isDisabled}
                row={5}
                id="description"
                value={logs[selectedLogKey].description}
                consultPackage={viewConsultPackage}
            />
            {/* @todo: rest of log data */}
        </InfoModal>
    );
};

export default AdminLogs;
