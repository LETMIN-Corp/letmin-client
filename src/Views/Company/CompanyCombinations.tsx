import { faEnvelope, faHeart, faHeartBroken, faTriangleExclamation, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CompanyCandidateCard from '../../Components/Cards/CompanyCandidateCard';
import CompanySkillCard from '../../Components/Cards/CompanySkillsCard';
import RadioInput from '../../Components/Inputs/RadioInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import FormModal from '../../Components/Modals/FormModal';
import { dispatchError, dispatchSuccess, formatErrors } from '../../Utils/ToastMessages';
import useCompany from '../../Utils/useCompany';
import useLoading from '../../Utils/useLoading';
import CompanyDefault from './CompanyDefault';

const CompanyCombinations: React.FC = () => {
    const company = useCompany();
    const { loading } = useLoading();

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false);

    const [companyData, setCompanyData] = useState<any>({});

    const [candidate, setCandidate] = useState({
        _id: '',
        name: '',
        role: '',
        description: '',
        picture: '',
        email: '',
        phone: '',
        username: '',
        createdAt: '',
        experiences: [],
        formations: [],
        skills: [],
    });

    const options = ['Conteúdo Inapropriado', 'Spam', 'Outro'];

    useEffect((): void => {
        window.document.title = 'Letmin - Combinação';

        if (id?.length !== 24) {
            return navigate('/company/indicators');
        }

        company.getCandidate(id).then((res: any) => {
            if (res.status != 200) {
                dispatchError(res.data.message);
                return navigate('/company/indicators');
            }
            setCandidate(res.data.data);
        });
    }, []);

    const InitialState = {
        reason: '',
        description: '',
        target: id || '',
    };

    const MessageInitialState = {
        subject: '',
        text: '',
    };

    function setMessageInitialSate() {
        setMessage({
            subject: 'Venha para a ' + companyData.name + '!',
            text: `Olá, estávamos buscando por funcionários para nossa empresa e encontramos você, um potencial talento para integrar nosso time!

Caso tenha interesse entre em contato conosco pelo telefone: ${ companyData.phone } ou pelo e-mail: ${ companyData.email }`,
        });
    }

    useEffect(() => {
        if (modalMessageIsOpen) {
            setMessageInitialSate();
        }
    }, [modalMessageIsOpen]);

    const [complaint, setComplaint] = useState(InitialState);
    const [message, setMessage] = useState(MessageInitialState);

    function getComplaintValue(name: string): string {
        return complaint[name as keyof typeof complaint];
    }

    function getMessageValue(name: string): string {
        return message[name as keyof typeof message];
    }

    const consultPackage = {
        getValue: getComplaintValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            setComplaint({
                ...complaint,
                [e.target.name]: e.target.value,
            });
        },
    };

    const messageConsultPackage = {
        getValue: getMessageValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage({
                ...message,
                [e.target.name]: e.target.value,
            });
        },
    };

    function handleConfirm() {
        setModalIsOpen(true);

        return company.createComplaint(complaint).then((res: any) => {
            if (res.data.success) {
                setModalIsOpen(false);
                setComplaint(InitialState);
                return dispatchSuccess(res.data.message);
            }
            dispatchError(formatErrors(res.data.message));
        });
    }

    function handleConfirmMessage() {
        return company.sendCandidateEmail(message, id!).then((res: any) => {
            if (res.data.success) {
                setModalMessageIsOpen(false);
                return dispatchSuccess(res.data.message);
            }
            dispatchError(formatErrors(res.data.message));
        });
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleCloseModalMessage = () => {
        setModalMessageIsOpen(false);
    };

    const [userInTalentBank, setUserInTalentBank] = useState(false);

    useEffect((): void => {
        company.getCompanyData().then((company: any) => {
            setCompanyData(company.data.data.company);
            setUserInTalentBank(company.data.data.talentBank.includes(params.id));
        });
    }, []);

    function alterUserCondition() {
        if (userInTalentBank) {
            company.removeFromTalentBank(params.id).then(() => {
                setUserInTalentBank(false);
            });
            return;
        }

        company.addToTalentBank(params.id).then((res: any) => {
            if (res.data.success && res.status === 201) {
                company.dispatchSuccess(res.data.message);
            } else {
                company.dispatchError(company.formatErrors(res.data.message));
            }
            setUserInTalentBank(true);
        });
    }

    return (
        <CompanyDefault>
            { loading ? (
                <Loading />
            ) : (
                <div>
                    <main className="min-w-screen">
                        <div className="h-32 bg-lively-purple"></div>
                        <div className="relative flex md:justify-end mx-5">
                            <img
                                src={candidate.picture.replace('s96-c', 's150-c') || 'https://via.placeholder.com/150'}
                                className="rounded-full bg-white border-4 border-lively-purple absolute left-0 -top-20"
                                referrerPolicy="no-referrer"
                            />
                            <div className="mt-5 text-lg justify-end flex items-center w-full">
                                <FontAwesomeIcon
                                    icon={ faEnvelope }
                                    onClick={ () => setModalMessageIsOpen(true) }
                                    className="border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-xl md:text-3xl transition ease-in-out delay-50"
                                />
                                <FontAwesomeIcon
                                    icon={ faTriangleExclamation }
                                    onClick={ () => setModalIsOpen(true) }
                                    className="ml-3 border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-xl md:text-3xl transition ease-in-out delay-50"
                                />
                                <FontAwesomeIcon
                                    icon={ userInTalentBank ? faHeartBroken : faHeart }
                                    onClick={ () => alterUserCondition() }
                                    className={
                                        userInTalentBank
                                            ? 'ml-3 border-4 border-red rounded-full p-2 cursor-pointer text-red text-xl md:text-3xl'
                                            : 'ml-3 border-4 border-bright-gray hover:border-primary rounded-full p-2 cursor-pointer text-bright-gray hover:text-primary text-xl md:text-3xl transition ease-in-out delay-50'
                                    }
                                />
                            </div>
                        </div>
                        <div className="mt-10 mx-5">
                            <div className="font-bold text-2xl text-dark-purple">{candidate.name}</div>
                            <div className="text-lg md:text-xl text-justify text-dark-gray">{candidate.role}</div>
                        </div>
                    </main>
                    <div className="min-h-80">
                        {!candidate.description && !candidate.experiences.length && !candidate.formations.length && !candidate.skills.length && (
                            <div className="px-5 h-80 flex flex-col items-center drop-shadow-md justify-center text-primary font-bold text-2xl">
                                <FontAwesomeIcon icon={faWarning} className="mr-2 text-5xl" />
                                <span className="text-center w-10/12 md:w-6/12 lg:w-4/12 mt-1">
                                    O usuário ainda não tem dados cadastrados!
                                </span>
                            </div>
                        )}
                        {candidate.description && (
                            <section className="px-5 mt-10">
                                <div className="font-medium text-xl text-dark-purple">Descrição</div>
                                <div className="text-lg md:text-xl text-justify">{candidate.description}</div>
                            </section>
                        )}
                                         
                        {!!candidate.skills.length && (
                            <section className="px-5 my-10">
                                <div className="font-medium text-xl text-dark-purple mb-2">Habilidades</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {candidate.skills.map((card, index) => (
                                        <CompanySkillCard key={index} card={card} />
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {!!candidate.experiences.length && (
                            <section className="px-5 mt-10">
                                <div className="font-medium text-xl text-dark-purple mb-2">
                                    Experiências Profissionais
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {candidate.experiences.map((card, key) => (
                                        <CompanyCandidateCard key={key} card={card} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {!!candidate.formations.length && (
                            <section className="px-5 my-10">
                                <div className="font-medium text-xl text-dark-purple mb-2">Formação Acadêmica</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {candidate.formations.map((card, key) => (
                                        <CompanyCandidateCard key={key} card={card} />
                                    ))}
                                </div>
                            </section>
                        )}       
                        <div className="px-5 mt-2 text-sm md:text-md text-dark-gray font-medium">
                            <span className="mr-1">Usuário @{candidate.username}, desde</span>
                            {new Date(candidate.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                    </div>
                </div>
            )}
            {
                modalIsOpen && (
                    <FormModal handleClose={handleCloseModal} handleConfirm={handleConfirm} title={`Denunciar usuário`}>
                        <div>
                            <div className="mt-2">
                                <RadioInput
                                    name="reason"
                                    id="reason"
                                    options={options}
                                    size="full"
                                    consultPackage={consultPackage}
                                />
                            </div>
                            <div className="mt-2">
                                <TextAreaInput
                                    name="description"
                                    resize={false}
                                    row={5}
                                    id="description"
                                    consultPackage={consultPackage}
                                    placeholder="Descrição"
                                />
                            </div>
                        </div>
                    </FormModal>
                )
            }
            {
                modalMessageIsOpen && (
                    <FormModal handleClose={ handleCloseModalMessage } handleConfirm={ handleConfirmMessage } title={`Enviar email`}>
                        <div>
                            <div className="mt-2">
                                <TextInput type='text' placeholder='Assunto' name='subject' id='subject' consultPackage={ messageConsultPackage } />
                            </div>
                            <div>
                                <TextAreaInput
                                    name="text"
                                    resize={false}
                                    row={5}
                                    id="text"
                                    consultPackage={ messageConsultPackage }
                                    placeholder="Mensagem"
                                />
                            </div>
                        </div>
                    </FormModal>
                )
            }
        </CompanyDefault>
    );
};

export default CompanyCombinations;
