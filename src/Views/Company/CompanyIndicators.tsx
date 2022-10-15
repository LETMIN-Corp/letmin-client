import {
    faChartLine,
    faCheck,
    faDoorOpen,
    faPencil,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../Components/Items/Loading';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import CompanyDefault from './CompanyDefault';

const CompanyIndicators = () => {
    const company = useCompany();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVacancyId, setCurrentVacancyId] = useState('');
    const [currentType, setCurrentType] = useState('');
    const [data, setData] = useState<VacancyData>([]);
    const { loading } = useLoading();

    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';

        company
            .getAllCompanyVacancies()
            .then((res: any) => {
                setData(res.data.vacancies);
            })
            .catch((err: any) => {
                company.dispatchError('Erro ao buscar as vagas da empresa');
            });
    }, []);

    interface Vacancy {
        _id: string;
        company_id: string;
        role: string;
        description: string;
        length: number;
        closed: boolean;
        candidates: [];
    }

    interface VacancyData {
        [key: number]: Vacancy;
        length: number;
        map: (arg0: (vacancy: Vacancy) => JSX.Element) => any;
        filter: (arg0: (vacancy: Vacancy) => boolean) => any;
        findIndex: (arg0: (vacancy: Vacancy) => boolean) => number;
        [Symbol.iterator](): IterableIterator<Vacancy>;
    }

    function openModalWithType(id: string, type: 'CONFIRM' | 'CLOSE' | 'OPEN') {
        setCurrentVacancyId(id);
        setModalIsOpen(true);
        if (type === 'CONFIRM') {
            setCurrentType('CONFIRM');
            return;
        }
        if (type === 'OPEN') {
            setCurrentType('OPEN');
            return;
        }
        setCurrentType('CLOSE');
    }

    function handleConfirm() {
        if (currentType === 'CONFIRM') {
            // if type is confirm, call confirmVacancy
            company.confirmVacancy(currentVacancyId).then((res: any) => {
                // set changed vacancy closed boolean to true
                const index = data.findIndex(
                    (vacancy: Vacancy) => vacancy._id === currentVacancyId,
                );
                data[index].closed = true;
                setData([...data]);
                setModalIsOpen(false);
            });
        } else if (currentType === 'OPEN') {
            company.confirmVacancy(currentVacancyId).then((res: any) => {
                // set changed vacancy closed boolean to false
                const index = data.findIndex(
                    (vacancy: Vacancy) => vacancy._id === currentVacancyId,
                );
                data[index].closed = false;
                setData([...data]);
                setModalIsOpen(false);
            });
        } else {
            // if type is close
            company.closeVacancy(currentVacancyId).then((res: any) => {
                if (res.data.success) {
                    const newData = data.filter(
                        (vacancy: Vacancy) => vacancy._id !== currentVacancyId,
                    );
                    setData(newData);
                }
            });
        }

        setCurrentType('');
        setCurrentVacancyId('');
        setModalIsOpen(false);
    }

    function getModalText() {
        if (currentType === 'CLOSE') {
            return 'cancelamento';
        }

        if (currentType === 'OPEN') {
            return 'reabertura';
        }

        if (currentType === 'CONFIRM') {
            return 'conclusão';
        }
    }

    return (
        <CompanyDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl text-dark-purple font-medium">
                    <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                    <span>Indicadores</span>
                </h1>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg">
                        {!data.length ? (
                            <div className="text-center">
                                <p className="text-xl">Nenhuma vaga cadastrada</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex md:text-lg font-medium">
                                    <div className="w-4/12 flex justify-center">Vaga</div>
                                    <div className="w-4/12 flex justify-center">
                                        Candidatos
                                    </div>
                                    <div className="w-4/12 flex justify-center">
                                        Ações
                                    </div>
                                </div>
                                <div>
                                    {data.map((row) => {
                                        return (
                                            <div
                                                key={row._id}
                                                className={`flex py-2 text-sm ${
                                                    row.closed ? 'bg-green-light' : ''
                                                } md:text-md `}
                                            >
                                                <div className="w-4/12 flex justify-center items-center text-center group">
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className={`text-green mr-2 ${
                                                            row.closed &&
                                                            row.candidates.length
                                                                ? ''
                                                                : 'hidden'
                                                        }`}
                                                    />
                                                    <Link
                                                        to={`../company/vacancy/${row._id}`}
                                                        className={
                                                            row.closed
                                                                ? 'text-slate-800 font-medium'
                                                                : 'text-primary font-medium hover:text-bright-purple'
                                                        }
                                                    >
                                                        {row.role}
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                            className="hidden ml-2 group-hover:inline-block"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="w-4/12 flex justify-center items-center text-center">
                                                    {row.candidates.length == 0 ? (
                                                        <span className="text-slate-800 font-medium">
                                                            0
                                                        </span>
                                                    ) : (
                                                        <Link
                                                            to={`../company/vacancy/data/${row._id}`}
                                                            className="text-primary font-medium hover:text-bright-purple"
                                                        >
                                                            {row.candidates.length}
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="w-4/12 flex justify-center items-center text-center">
                                                    {row.closed && (
                                                        <button
                                                            className="py-2 px-3 flex items-center jusitfy-center bg-green text-white rounded-md mr-3"
                                                            onClick={() =>
                                                                openModalWithType(
                                                                    row._id,
                                                                    'OPEN',
                                                                )
                                                            }
                                                        >
                                                            <span className="mr-1 hidden lg:flex">
                                                                Reabrir
                                                            </span>
                                                            <FontAwesomeIcon
                                                                icon={faDoorOpen}
                                                                className="text-xl"
                                                            />
                                                        </button>
                                                    )}
                                                    {!row.closed && (
                                                        <button
                                                            className="py-2 px-2 flex items-center jusitfy-center bg-green text-white rounded-md mr-3"
                                                            onClick={() =>
                                                                openModalWithType(
                                                                    row._id,
                                                                    'CONFIRM',
                                                                )
                                                            }
                                                        >
                                                            <span className="mr-1 hidden lg:flex">
                                                                Concluir
                                                            </span>
                                                            <FontAwesomeIcon
                                                                icon={faCheck}
                                                                className="text-xl"
                                                            />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="py-2 px-3 flex items-center jusitfy-center bg-red text-white rounded-md"
                                                        onClick={() =>
                                                            openModalWithType(
                                                                row._id,
                                                                'CLOSE',
                                                            )
                                                        }
                                                    >
                                                        <span className="mr-1 hidden lg:flex">
                                                            Encerrar
                                                        </span>
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            className="text-xl"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                )}
                {modalIsOpen && (
                    <ConfirmationModal
                        title="Confirmar"
                        text={`Confirmar ${getModalText()} da vaga?`}
                        handleClose={() => setModalIsOpen(false)}
                        handleConfirm={() => handleConfirm()}
                    />
                )}
            </div>
        </CompanyDefault>
    );
};

export default CompanyIndicators;
