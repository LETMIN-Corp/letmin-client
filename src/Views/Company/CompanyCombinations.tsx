import HighLight from '../../Components/Items/HighLight';
import { useEffect, useState } from 'react';
import CompanyDefault from './CompanyDefault';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTriangleExclamation, faHeartBroken, faPencil } from '@fortawesome/free-solid-svg-icons';
import FormModal from '../../Components/Modals/FormModal';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';
import { dispatchError, dispatchSuccess } from '../../Utils/ToastMessages';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import { Link } from 'react-router-dom';
import CompanyCandidateCard from '../../Components/Cards/CompanyCandidateCard';

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
        role: '',
        description: '',
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
            company.addToTalentBank(params.id).then((res: any) => {
                if (res.data.success && res.status === 201) {
                    company.dispatchSuccess(res.data.message);
                }
                else {
                    company.dispatchError(company.formatErrors(res.data.message));
                }
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
            {/* <div className='flex justify-center items-center py-5 lg:py-10 bg-primary'>
                <h1 className='text-white text-4xl lg:text-5xl font-black mt-4'>Combinação</h1>
            </div> */}
            {
                loading ? <Loading /> : (
                    <div>
                        <main>
                            <div className='h-32 bg-lively-purple'></div>
                            <div className='relative flex md:justify-end mx-5'>
                                <img src={ candidate.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'} className='rounded-full bg-white border-4 border-lively-purple absolute left-0 -top-20' referrerPolicy='no-referrer' />
                                <div className='mt-5 text-lg justify-end flex items-center w-full'>
                                    <FontAwesomeIcon 
                                        icon={ faTriangleExclamation } 
                                        onClick={() => setModalIsOpen(true)} 
                                        className='border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-xl md:text-3xl transition ease-in-out delay-50'
                                    />
                                    <FontAwesomeIcon 
                                        icon={ userInTalentBank ? faHeartBroken : faHeart }
                                        onClick={ () => alterUserCondition(userInTalentBank ? 'REMOVE' : 'ADD') }
                                        className={ userInTalentBank ? 
                                            'ml-3 border-4 border-red rounded-full p-2 cursor-pointer text-red text-xl md:text-3xl' : 
                                            'ml-3 border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-xl md:text-3xl transition ease-in-out delay-50'
                                        }
                                    />
                                </div>
                            </div>
                            <div className='mt-10 mx-5'>
                                <div className='font-medium text-2xl md:text-3xl text-dark-purple'>{ candidate.name }</div>
                                <div className='text-lg md:text-xl text-justify text-dark-grey'>{ candidate.role }</div>
                            </div>
                        </main>
                        <section className='px-5 mt-10'>
                            <div className='font-medium md:text-2xl text-xl text-dark-purple'>Descrição</div>
                            <div className='text-lg md:text-xl text-justify'>{ candidate.description }</div>
                        </section>
                        <section className='px-5 mt-10'>
                            <div className='font-medium md:text-2xl text-xl text-dark-purple mb-2'>Experiências Profissionais</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...candidate.experiences,
                                    ].map((card, key) => <CompanyCandidateCard key={ key } card={ card } /> )
                                }
                            </div>
                        </section>
                        <section className='px-5 my-10'>
                            <div className='font-medium md:text-2xl text-xl text-dark-purple mb-2'>Formação Acadêmica</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {
                                    [
                                        ...candidate.formations,
                                    ].map((card, key) => <CompanyCandidateCard key={ key } card={ card } /> )
                                }
                            </div>
                        </section>
                    </div>
                )
            }
            {
                modalIsOpen && (
                    <FormModal handleClose={ handleCloseModal } handleConfirm={ handleConfirm } title={`Denunciar`}>
                        <div>
                            <div className='mt-2'>
                                {
                                    options.map(option => (
                                        <div key={ option.value } className='flex items-center '>
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
