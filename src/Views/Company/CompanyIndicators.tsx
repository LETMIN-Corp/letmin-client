import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import useCompany from '../../Utils/useCompany';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import { Link } from 'react-router-dom';

const CompanyIndicators =  () => {
    const Company = useCompany();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVacancyId, setCurrentVacancyId] = useState('');
    const [currentType, setCurrentType] = useState('');
    const [data, setData] = useState<VacancyData>([]); 

    useEffect((): void => {
        window.document.title = 'Letmin - Indicadores';

        Company.getAllVacancies()
        .then((res: any ) => {
            setData(res.data.vacancies);
        })
        .catch((err: any) => {
            console.log('err: ', err);
        });
    }, []);

    
    interface Vacancy {
        _id : string;
        company_id : string;
        role : string;
        description : string;
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

    function openModalWithType(id : string, type : 'CONFIRM' | 'CLOSE') {
        setCurrentVacancyId(id);
        setModalIsOpen(true);
        if(type === 'CONFIRM') {
            setCurrentType('CONFIRM');
            return;
        }
        setCurrentType('CLOSE');
    }

    function handleConfirm() {
        if(currentType === 'CONFIRM') {
            // if type is confirm, call confirmVacancy
            Company.confirmVacancy(currentVacancyId)
            .then((res: any) => {
                // set changed vacancy closed boolean to true
                const index = data.findIndex((vacancy: Vacancy) => vacancy._id === currentVacancyId);
                data[index].closed = true;
                setData([...data]);
                setModalIsOpen(false); 
            })
        } else {
            // if type is close
            Company.closeVacancy(currentVacancyId)
            .then((res: any) => {
                if (res.data.success) {
                    let newData = data.filter((vacancy: Vacancy) => vacancy._id !== currentVacancyId);
                    setData(newData);
                }
            })
        }

        setCurrentType('');
        setCurrentVacancyId('');
        setModalIsOpen(false);
    }

    return (
        <CompanyDefault>
            <div className="p-5 min-h-90">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faChartLine } className='mr-2' />
                    <span>Indicadores</span>
                </h1>
                
                <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
                {
                    (!data.length) && (
                        <div className='text-center'>
                            <p className='text-xl'>Nenhuma vaga cadastrada</p>
                        </div>
                    )
                }
                {
                    !!data.length && (
                        <>
                            <div className='flex text-xl font-medium'>
                                <div className='w-4/12 flex justify-center'>
                                    Descrição
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Candidatos
                                </div>
                                <div className='w-4/12 flex justify-center'>
                                    Ações
                                </div>
                            </div>
                            <div>
                                {
                                    data.map((row) => {
                                        return (
                                            <div key={ row._id } className={`flex pt-2 text-sm ${row.closed ? 'bg-green-light' : ''} md:text-md `}>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    { row.role }
                                                </div>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    <Link to='../company/vacancy/data' className="text-primary font-medium hover:text-bright-purple">{ row.candidates.length }</Link>                
                                                </div>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    {
                                                        !row.closed && (
                                                            <button onClick={ () => openModalWithType(row._id, 'CONFIRM') }>
                                                                <FontAwesomeIcon icon={ faCheck } className='text-xl text-green mr-3' />
                                                            </button>
                                                        )
                                                    }
                                                    <button onClick={ () => openModalWithType(row._id, 'CLOSE') }>
                                                        <FontAwesomeIcon icon={ faXmark } className='text-xl text-red' />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                }
                </div>
                {
                    modalIsOpen && <ConfirmationModal title='Confirmar' text={`Confirmar ${ currentType === 'CLOSE' ? 'cancelamento' : 'conclusão'} da vaga?`} handleClose={ () => setModalIsOpen(false) } handleConfirm={ () => handleConfirm() } />
                }
            </div>
        </CompanyDefault>
    );
}

export default CompanyIndicators;
