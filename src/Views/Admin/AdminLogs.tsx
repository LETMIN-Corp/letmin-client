import { faBan, faBuilding, faInfo, faMagnifyingGlass, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    function handleLogBlock(id: string): void {
        // admin.blockCompany(id).then((res: any) => {
        //     setLogs(res.data.companies);
        //     setAllLogs(res.data.companies);
        // });
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
                {loading ? (
                    <Loading />
                ) : logs.length == 0 ? (
                    <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                        Nenhum Log encontrado
                    </div>
                ) : (
                    <div className="mt-5 break-all">
                        <div className="text-sm md:text-md font-medium flex justify-between w-full px-1">
                            {/* <span className="w-5/12 md:w-7/12 pr-1">Ação</span> */}
                            <span className="w-5/12 md:w-7/12 pr-1">Descrição</span>
                            <span className="w-4/12 pr-1">Data</span>
                            {/* <span className="w-4/12 pr-1">IP</span> */}
                            <span className="w-3/12 md:w-12 pr-1">Ações</span>
                        </div>
                        <div>
                            {logs.map((log, key) => (
                                <TableCard
                                    key={key}
                                    log={log}
                                    handleOpen={() => handleOpen(key)}
                                    handleLogBlock={() => handleLogBlock(log._id)}
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
    handleLogBlock: () => void;
}

const TableCard: React.FC<TableCardInterface> = ({ log, handleOpen, handleLogBlock }) => {
    return (
        <div className="text-sm bg-lilac py-2 px-1 md:px-2 rounded-sm flex items-center justify-between mt-2">
            <span className="w-5/12 md:w-7/12 pr-1">
                Log {log.description}
            </span>
            <span className="w-4/12 pr-1">{new Date(log.createdAt).toLocaleDateString('pt-BR')}</span>
            <span className="w-3/12 md:w-12 md:text-lg pr-1 flex justify-between">
                <div className="cursor-pointer">
                    <FontAwesomeIcon icon={faInfo} onClick={handleOpen} className="text-dark-purple" />
                </div>
                <div className="cursor-pointer" onClick={() => handleLogBlock()}>
                    {!false ? (
                        <FontAwesomeIcon icon={faBan} className="text-red" />
                    ) : (
                        <FontAwesomeIcon icon={faUnlock} className="text-primary" />
                    )}
                </div>
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
        <InfoModal title="Informações" handleClose={handleClose} showIcon={false}>
            descrição: {logs[selectedLogKey].description}
        </InfoModal>
    );
};

export default AdminLogs;
