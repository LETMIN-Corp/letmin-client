import HighLight from '../../Components/Items/HighLight';
import { useEffect, useState } from 'react';
import CompanyDefault from './CompanyDefault';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLeftLong, faRightLong, faTriangleExclamation, faTrash, faBriefcase, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import FormModal from '../../Components/Modals/FormModal';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';
import { dispatchError, dispatchSuccess } from '../../Utils/ToastMessages';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';

const CompanyCombinations : React.FC = () => {
    const company = useCompany();
    const { loading } = useLoading();

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [candidate, setCandidate] = useState({
        _id: '',
        name: '',
        picture: '',
        email: '',
        phone: '',
        experiences: [],
        formations: []
    })

    const options = [
        { label: "Conteúdo inapropriado", value: "Conteúdo inapropriado" },
        { label: "Spam", value: "Spam" },
        { label: "Outros", value: "Outros" },
    ];

    useEffect((): void => {
        window.document.title = 'Letmin - Combinação';

        if (id?.length !== 24) {
            return navigate('/company/indicators');
        }

        company.getCandidate(id).then((res: any) => {
            setCandidate(res.data.data);
        })
    }, []);

    const InitialState = {
        reason: '',
        description: '',
        target: id || '',
    }

    const [complaint, setComplaint] = useState(InitialState);

    function getComplaintValue (name: string): string {
        return complaint[name as keyof typeof complaint];
    }

    const consultPackage = {
        getValue: getComplaintValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement>) => {
            setComplaint({
                ...complaint,
                [e.target.name]: e.target.value
            });
        }
    };

    function setCheckboxValue (e: React.ChangeEvent<HTMLInputElement>): void {
        setComplaint({
            ...complaint,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirm () {
        setModalIsOpen(true);
        return company.createComplaint(complaint).then((res: any) => {
            if(res.data.success) {
                setModalIsOpen(false);
                setComplaint(InitialState);
                return dispatchSuccess(res.data.message);
            }
            dispatchError(res.data.message);
        })
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const [userInTalentBank, setUserInTalentBank] = useState(false);

    useEffect((): void => {
        company.getCompanyData().then((company : any) => {
            setUserInTalentBank(company.data.data.talentBank.includes(params.id));
        });
    }, []);

    function alterUserCondition(type : 'ADD' | 'REMOVE') {
        if(type == 'ADD') {
            company.addToTalentBank(params.id).then(() => {
                setUserInTalentBank(true);
            });
            return;
        }

        company.removeFromTalentBank(params.id).then(() => {
            setUserInTalentBank(false);
        });
    }

    return (
        <CompanyDefault>
            <div className='flex justify-center items-center py-5 lg:py-10 bg-primary'>
                <h1 className='text-white text-4xl lg:text-5xl font-black mt-4'>Combinação</h1>
            </div>
            {
                loading ? <Loading /> : (
                    <div className='p-5'>
                        <section className='flex flex-col justify-center items-center py-10'>
                            <div className='w-full flex items-center justify-between lg:w-8/12'>
                                <div>
                                    <img src={candidate.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'} className='rounded-md' alt='Use Picture' referrerPolicy='no-referrer' />
                                </div>
                                <div>
                                    <FontAwesomeIcon 
                                        icon={ faTriangleExclamation } 
                                        onClick={() => setModalIsOpen(true)} 
                                        className='border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-3xl transition ease-in-out delay-50'
                                    />
                                    <FontAwesomeIcon 
                                        icon={ userInTalentBank ? faHeartBroken : faHeart }
                                        onClick={ () => alterUserCondition(userInTalentBank ? 'REMOVE' : 'ADD') }
                                        className={ userInTalentBank ? 
                                            'ml-3 border-4 border-red rounded-full p-2 cursor-pointer text-red text-3xl' : 
                                            'ml-3 border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-3xl transition ease-in-out delay-50'
                                        }
                                    />
                                </div>
                            </div>
                        </section>
                        <section className='flex w-full lg:w-8/12 mx-auto flex-wrap md:text-left'>
                            <h2 className='w-full text-dark-purple font-bold text-3xl mb-5'>{candidate.name}</h2>
                            <div className='md:w-6/12'>
                                <div className='md:pr-4'>
                                    <h4 className='text-xl font-bold text-dark-purple'>Habilidades extras:</h4>
                                    <p>
                                        {
                                            candidate.experiences.map((key) => 
                                                <p>{key}</p>
                                            )
                                        }
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>
                                </div>
                                <div className='md:pr-4'>
                                    <h4 className='text-xl font-bold text-dark-purple'>Observações:</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>
                                </div>
                            </div>
                            <div className='md:w-6/12'>
                                <div className='md:pr-4'>
                                    <h4 className='text-xl font-bold text-dark-purple'>Pontos de atenção:</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>
                                </div>
                                <div className='md:pr-4'>
                                <h4 className='text-xl font-bold text-dark-purple'>Média empregado:</h4>
                                <p>
                                    Há mais de <HighLight>2 anos</HighLight>
                                </p>
                                </div>
                            </div>
                        </section>
                        <section className='w-full lg:w-8/12 mx-auto py-10'>
                                <h2 className='text-3xl text-dark-purple md:text-left font-bold mb-4'>Portfólio</h2>
                                <p className='text-lg text-justify md:w-10/12 lg:w-8/12 my-6'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat
                                </p>
                        </section>
                    </div>
                )
            }
            {
                modalIsOpen && (
                    <FormModal handleClose={ handleCloseModal } handleConfirm={ handleConfirm } title={`Denunciar`}>
                        <div className=''>
                            <div>
                                <div className='text-dark-purple text-lg mb-1'>Motivo</div>
                                {
                                    options.map(option => (
                                        <div key={option.value} className='flex items-center'>
                                            <input 
                                                className='mr-3 h-4 w-4 cursor-pointer'
                                                id={option.value}
                                                name='reason'
                                                value={option.value}
                                                onChange={ setCheckboxValue }
                                                type="radio" 
                                            />
                                            <label htmlFor={option.value} className='cursor-pointer'>
                                                {option.value}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='mt-2'>
                                <TextAreaInput
                                    name='description'
                                    resize={ false }
                                    row={ 5 }
                                    id='description'
                                    // @ts-ignore:next-line
                                    consultPackage={ consultPackage }
                                    placeholder='Descrição'
                                />
                            </div>
                        </div>
                    </FormModal>
                )
            }
        </CompanyDefault> 
    );
}

export default CompanyCombinations;
