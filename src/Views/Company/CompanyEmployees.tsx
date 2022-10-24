import { faChartLine, faCheck, faDoorOpen, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyTalentSearchCard from '../../Components/Cards/CompanySearchCard';
import List from '../../Components/Items/List';

import Loading from '../../Components/Items/Loading';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import CompanyDefault from './CompanyDefault';

const CompanyEmployees = () => {
    const company = useCompany();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVacancyId, setCurrentVacancyId] = useState('');
    const [currentType, setCurrentType] = useState('');
    const [data, setData] = useState<Employees>([]);
    const { loading } = useLoading();
    const [userCards, setUserCards] = useState([]);

    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';

        company
            .getCompanyEmployees()
            .then((res: any) => {
                setData(res.data.employees);
            })
            .catch((err: any) => {
                company.dispatchError('Erro ao buscar as vagas da empresa');
            });
    }, []);

    useEffect(() => {
        const cards: any = data.map((user) => <CompanyTalentSearchCard user={user} key={user._id} />);
        setUserCards(cards);
    }, [data]);

    interface Employee {
        _id: string;
        name: string;
        role: string;
        description: string;
        length: number;
    }

    interface Employees {
        [key: number]: Employee;
        length: number;
        map: (arg0: (vacancy: Employee) => JSX.Element) => any;
        filter: (arg0: (vacancy: Employee) => boolean) => any;
        findIndex: (arg0: (vacancy: Employee) => boolean) => number;
        [Symbol.iterator](): IterableIterator<Employee>;
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
                const index = data.findIndex((vacancy: Employee) => vacancy._id === currentVacancyId);
                data[index].closed = true;
                setData([...data]);
                setModalIsOpen(false);
            });
        } else if (currentType === 'OPEN') {
            company.confirmVacancy(currentVacancyId).then((res: any) => {
                // set changed vacancy closed boolean to false
                const index = data.findIndex((vacancy: Employee) => vacancy._id === currentVacancyId);
                data[index].closed = false;
                setData([...data]);
                setModalIsOpen(false);
            });
        } else {
            // if type is close
            company.closeVacancy(currentVacancyId).then((res: any) => {
                if (res.data.success) {
                    const newData = data.filter((vacancy: Employee) => vacancy._id !== currentVacancyId);
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
                    <span>Funcionários</span>
                </h1>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {!!userCards.length && (
                            <div className="mt-7">
                                <p className="text-bright-gray font-bold text-sm md:text-md text-md mb-2">
                                    {userCards.length} resultados encontrados
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 flex flex-col justify-center items-center md:grid-cols-1 gap-7 w-full md:mb-5">
                            {userCards.length > 0 ? (
                                <List data={userCards} itemsPerPage={10}></List>
                            ) : (
                                <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                                    Nenhum item encontrado
                                </div>
                            )}
                        </div>
                    </>
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

export default CompanyEmployees;
