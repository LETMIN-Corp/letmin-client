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

        Company.getAllVacancies(Company.userData.user_id)
        .then((res: any ) => {
            setData(res.data.jobs);
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
        candidates: [];
    }
    
    interface VacancyData {
        [key: number]: Vacancy;
        map: (arg0: (vacancy: Vacancy) => JSX.Element) => any;
        length: number;
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
            console.log('current', currentVacancyId);
            Company.confirmVacancy(currentVacancyId)
        } else {
            // if type is close
            //Company.closeVacancy(currentVacancyId)
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
                {
                    !!data.length && (
                        <div className='bg-lilac w-full py-5 mt-5 rounded-sm drop-shadow-lg'>
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
                                            <div key={ row._id } className='flex pt-2 text-sm md:text-md'>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    { row.role }
                                                </div>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    <Link to='../company/vacancy/data' className="text-primary font-medium hover:text-bright-purple">{ row.candidates.length }</Link>                
                                                </div>
                                                <div className='w-4/12 flex justify-center items-center text-center'>
                                                    <button onClick={ () => openModalWithType(row._id, 'CONFIRM') }>
                                                        <FontAwesomeIcon icon={ faCheck } className='text-xl text-green mr-3' />
                                                    </button>
                                                    <button onClick={ () => openModalWithType(row._id, 'CLOSE') }>
                                                        <FontAwesomeIcon icon={ faXmark } className='text-xl text-red' />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                {
                    modalIsOpen && <ConfirmationModal title='Confirmar' text={`Confirmar ${ currentType === 'CLOSE' ? 'cancelamento' : 'conclusão'} da vaga?`} handleClose={ () => setModalIsOpen(false) } handleConfirm={ () => handleConfirm() } />
                }
            </div>
        </CompanyDefault>
    );
}

export default CompanyIndicators;
