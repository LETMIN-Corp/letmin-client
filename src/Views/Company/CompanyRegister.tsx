import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormButton from '../../Components/Buttons/FormButton';
import PlanCard from '../../Components/Cards/PlanCard';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import Pagination from '../../Components/Items/Pagination';
import Footer from '../../Components/Layouts/Footer';
import Menu from '../../Components/Layouts/Menu';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import StripTitle from '../../Components/Titles/StripTitle';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import PlanTypesEnum from '../../Enums/PlanTypesEnum';
import useAuth from '../../Utils/useAuth';

const CorpRegister: React.FC = () => {
    const auth = useAuth();
    useEffect((): void => {
        window.document.title = 'Letmin - Cadastro';
    }, []);

    const navigate = useNavigate();

    const pageButtons = [
        {
            text: 'Voltar',
            path: '/register',
            isLink: true,
            hasFunction: true,
            handleClick: () => setModalIsOpen(true),
        },
    ];

    class RegisterData {
        company = {
            name: '',
            cnpj: '',
            address: '',
            phone: '',
            email: '',
        };
        holder = {
            name: '',
            cpf: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        plan = {
            selected: '',
        };
        card = {
            type: '',
            number: '',
            owner: '',
            expiration: '',
            code: '',
        };
        [key: string]: any;
    }
    const [currentPage, setCurrentPage] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [termIsAccepted, setTermIsAccepted] = useState(false);
    const [registerData, setRegisterData] = useState<RegisterData>(new RegisterData());

    function returnToRegisterPage() {
        navigate('/register');
    }

    function getInputValue(name: string): string {
        const [type, data] = name.split('-');

        return registerData[type][data];
    }

    function setInputValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setRegisterData({
            ...registerData,
            [type]: { ...registerData[type], [data]: value },
        });
    }

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [currentPage]);

    function setSelectedPlan(selectedPlan: string): void {
        setRegisterData({
            ...registerData,
            plan: {
                selected: selectedPlan,
            },
        });
    }

    function getSelectedPlan(): string {
        return registerData.plan.selected;
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    const viewConsultPackage = {
        getValue: getInputValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {},
    };

    const pageConstraints = {
        min: 0,
        max: 3,
    };

    const cardTypes = ['Mastercard', 'Visa', 'American Express', 'Hipercard'];

    return (
        <>
            {modalIsOpen && (
                <ConfirmationModal
                    title="Sair do cadastro"
                    text="Você pode perder seus dados. Tem certeza que deseja sair do cadastro?"
                    handleClose={() => setModalIsOpen(false)}
                    handleConfirm={returnToRegisterPage}
                />
            )}
            <Menu menuButtons={pageButtons} />
            <StripTitle text="Cadastro de Empresa" />
            <div className="w-screen min-h-screen p-5 md:px-20 md:py-10">
                <Pagination max={pageConstraints.max} current={currentPage} handleClick={setCurrentPage} />

                {currentPage === 0 && (
                    <>
                        <h2 className="text-xl font-bold my-5 md:text-2xl text-dark-purple lg:w-8/12 lg:mx-auto">
                            Informações da Empresa
                        </h2>

                        <form className="mb-10 lg:w-8/12 lg:mx-auto">
                            <div className="md:flex justify-between w-full">
                                <TextInput
                                    required={true}
                                    placeholder="Razão Social"
                                    size="large"
                                    limit={64}
                                    type={InputTypesEnum.text}
                                    consultPackage={consultPackage}
                                    name="company-name"
                                    id="company-name"
                                />
                                <TextInput
                                    required={true}
                                    placeholder="CNPJ"
                                    size="medium"
                                    useMask={MaskTypesEnum.cnpj}
                                    type={InputTypesEnum.text}
                                    consultPackage={consultPackage}
                                    name="company-cnpj"
                                    id="company-cnpj"
                                />
                            </div>
                            <div className="md:flex justify-between w-full">
                                <TextInput
                                    required={true}
                                    placeholder="E-mail"
                                    size="large"
                                    limit={64}
                                    type={InputTypesEnum.email}
                                    consultPackage={consultPackage}
                                    name="company-email"
                                    id="company-email"
                                />
                                <TextInput
                                    required={true}
                                    placeholder="Telefone"
                                    size="medium"
                                    useMask={MaskTypesEnum.phone}
                                    type={InputTypesEnum.tel}
                                    consultPackage={consultPackage}
                                    name="company-phone"
                                    id="company-phone"
                                />
                            </div>
                            <TextInput
                                required={true}
                                placeholder="Endereço"
                                limit={128}
                                type={InputTypesEnum.text}
                                consultPackage={consultPackage}
                                name="company-address"
                                id="company-address"
                            />
                        </form>

                        <h2 className="text-xl font-bold my-5 md:text-2xl text-dark-purple lg:w-8/12 lg:mx-auto">
                            Informações do Titular
                        </h2>

                        <form className="lg:w-8/12 lg:mx-auto">
                            <div className="md:flex justify-between w-full">
                                <TextInput
                                    required={true}
                                    placeholder="Nome do Titular"
                                    size="large"
                                    limit={64}
                                    useMask={MaskTypesEnum.holder}
                                    type={InputTypesEnum.text}
                                    consultPackage={consultPackage}
                                    name="holder-name"
                                    id="holder-name"
                                />
                                <TextInput
                                    required={true}
                                    placeholder="CPF"
                                    type={InputTypesEnum.text}
                                    size="medium"
                                    useMask={MaskTypesEnum.cpf}
                                    consultPackage={consultPackage}
                                    name="holder-cpf"
                                    id="holder-cpf"
                                />
                            </div>
                            <div className="md:flex justify-between w-full">
                                <TextInput
                                    required={true}
                                    placeholder="E-mail"
                                    size="large"
                                    limit={64}
                                    type={InputTypesEnum.email}
                                    consultPackage={consultPackage}
                                    name="holder-email"
                                    id="holder-email"
                                />
                                <TextInput
                                    required={true}
                                    placeholder="Telefone"
                                    size="medium"
                                    useMask={MaskTypesEnum.phone}
                                    type={InputTypesEnum.tel}
                                    consultPackage={consultPackage}
                                    name="holder-phone"
                                    id="holder-phone"
                                />
                            </div>
                            <TextInput
                                required={true}
                                placeholder="Senha"
                                limit={128}
                                type={InputTypesEnum.password}
                                consultPackage={consultPackage}
                                name="holder-password"
                                id="holder-password"
                            />
                            <TextInput
                                required={true}
                                placeholder="Confirmar Senha"
                                limit={128}
                                type={InputTypesEnum.password}
                                consultPackage={consultPackage}
                                name="holder-confirmPassword"
                                id="holder-confirmPassword"
                            />
                        </form>
                    </>
                )}

                {currentPage === 1 && (
                    <>
                        <h2 className="text-xl font-bold my-5 md:text-2xl text-dark-purple lg:w-8/12 lg:mx-auto">
                            Seleção de Assinatura
                        </h2>

                        <div className="lg:mx-auto  lg:flex justify-center md:my-10 md:px-2">
                            {[
                                {
                                    title: 'Plano semestral',
                                    description: 'bbb',
                                    price: 'R$ 200,00',
                                    totalPrice: 'R$ 1200,00 / Semestre',
                                    features: [
                                        'Banco de talentos',
                                        'Lançamento de demandas',
                                        'Avaliação de perfil de candidato',
                                        'Envio de e-mails automatizados',
                                    ],
                                    type: PlanTypesEnum.semiannual,
                                    handleClick: () => setSelectedPlan(PlanTypesEnum.semiannual),
                                },
                                {
                                    title: 'Plano anual',
                                    description: 'fff',
                                    price: 'R$ 160,00',
                                    totalPrice: 'R$ 1920,00 / Ano',
                                    features: [
                                        'Banco de talentos',
                                        'Lançamento de demandas',
                                        'Avaliação de perfil de candidato',
                                        'Envio de e-mails automatizados',
                                    ],
                                    type: PlanTypesEnum.annual,
                                    handleClick: () => setSelectedPlan(PlanTypesEnum.annual),
                                },
                            ].map((card, key) => (
                                <PlanCard key={key} card={card} selected={card.type === getSelectedPlan()} />
                            ))}
                        </div>
                    </>
                )}

                {currentPage === 2 && (
                    <>
                        <h2 className="text-xl font-bold my-5 md:text-2xl text-dark-purple lg:w-8/12 lg:mx-auto">
                            Informações do Cartão
                        </h2>

                        <form className="mb-10 lg:w-8/12 lg:mx-auto">
                            <TextInput
                                required={true}
                                placeholder="Nome do Titular"
                                limit={64}
                                useMask={MaskTypesEnum.holder}
                                type={InputTypesEnum.text}
                                consultPackage={consultPackage}
                                name="card-owner"
                                id="card-owner"
                            />
                            <TextInput
                                required={true}
                                placeholder="Número do Cartão"
                                type={InputTypesEnum.text}
                                consultPackage={consultPackage}
                                useMask={MaskTypesEnum.cardNumber}
                                name="card-number"
                                id="card-number"
                            />

                            <div className="md:flex justify-between w-full">
                                <TextInput
                                    required={true}
                                    placeholder="Data de Vencimento"
                                    size="medium"
                                    useMask={MaskTypesEnum.date}
                                    type={InputTypesEnum.text}
                                    consultPackage={consultPackage}
                                    name="card-expiration"
                                    id="card-expiration"
                                />
                                <TextInput
                                    required={true}
                                    placeholder="CVV"
                                    size="small"
                                    useMask={MaskTypesEnum.cvv}
                                    type={InputTypesEnum.text}
                                    consultPackage={consultPackage}
                                    name="card-code"
                                    id="card-code"
                                />
                                <SelectInput
                                    placeholder="Bandeira"
                                    options={cardTypes}
                                    size="small"
                                    consultPackage={consultPackage}
                                    name="card-type"
                                    id="card-type"
                                    disabled={false}
                                    required={true}
                                />
                            </div>
                        </form>
                    </>
                )}
                {currentPage === 3 && (
                    <>
                        <h2 className="text-xl font-bold my-5 md:text-2xl text-dark-purple lg:w-8/12 lg:mx-auto">
                            Confirmação de Dados
                        </h2>

                        <div>
                            <h3 className="text-lg font-bold my-5 lg:w-8/12 text-dark-purple lg:mx-auto">
                                Informações da Empresa
                            </h3>
                            <form className="mb-10 lg:w-8/12 lg:mx-auto">
                                <div className="md:flex justify-between w-full">
                                    <TextInput
                                        required={true}
                                        placeholder="Razão Social"
                                        size="large"
                                        type={InputTypesEnum.text}
                                        consultPackage={viewConsultPackage}
                                        name="company-name"
                                        disabled={true}
                                    />
                                    <TextInput
                                        required={true}
                                        placeholder="CNPJ"
                                        size="medium"
                                        type={InputTypesEnum.text}
                                        consultPackage={viewConsultPackage}
                                        name="company-cnpj"
                                        disabled={true}
                                    />
                                </div>
                                <div className="md:flex justify-between w-full">
                                    <TextInput
                                        required={true}
                                        placeholder="E-mail"
                                        size="large"
                                        type={InputTypesEnum.email}
                                        consultPackage={viewConsultPackage}
                                        name="company-email"
                                        disabled={true}
                                    />
                                    <TextInput
                                        required={true}
                                        placeholder="Telefone"
                                        size="medium"
                                        type={InputTypesEnum.tel}
                                        consultPackage={viewConsultPackage}
                                        name="company-phone"
                                        disabled={true}
                                    />
                                </div>
                                <TextInput
                                    placeholder="Endereço"
                                    type={InputTypesEnum.text}
                                    consultPackage={viewConsultPackage}
                                    name="company-address"
                                    disabled={true}
                                />
                            </form>

                            <h3 className="text-lg font-bold my-5 lg:w-8/12 text-dark-purple lg:mx-auto">
                                Informações do Titular
                            </h3>
                            <form className="lg:w-8/12 lg:mx-auto">
                                <div className="md:flex justify-between w-full">
                                    <TextInput
                                        required={true}
                                        placeholder="Nome do Titular"
                                        size="large"
                                        type={InputTypesEnum.text}
                                        consultPackage={viewConsultPackage}
                                        name="holder-name"
                                        disabled={true}
                                    />
                                    <TextInput
                                        required={true}
                                        placeholder="CPF"
                                        type={InputTypesEnum.text}
                                        size="medium"
                                        consultPackage={viewConsultPackage}
                                        name="holder-cpf"
                                        disabled={true}
                                    />
                                </div>
                                <div className="md:flex justify-between w-full">
                                    <TextInput
                                        required={true}
                                        placeholder="E-mail"
                                        size="large"
                                        type={InputTypesEnum.email}
                                        consultPackage={viewConsultPackage}
                                        name="holder-email"
                                        disabled={true}
                                    />
                                    <TextInput
                                        required={true}
                                        placeholder="Telefone"
                                        size="medium"
                                        type={InputTypesEnum.tel}
                                        consultPackage={viewConsultPackage}
                                        name="holder-phone"
                                        disabled={true}
                                    />
                                </div>
                            </form>

                            <h3 className="text-lg font-bold my-5 lg:w-8/12 text-dark-purple lg:mx-auto">
                                Informações de Assinatura
                            </h3>
                            <div className="lg:w-8/12 lg:mx-auto">
                                <TextInput
                                    required={true}
                                    placeholder="Plano Selecionado"
                                    type={InputTypesEnum.text}
                                    consultPackage={viewConsultPackage}
                                    name="plan-selected"
                                    disabled={true}
                                />
                            </div>

                            <h3 className="text-lg font-bold my-5 lg:w-8/12 text-dark-purple lg:mx-auto">
                                Informações do Cartão
                            </h3>
                            <form className="mb-10 lg:w-8/12 lg:mx-auto">
                                <TextInput
                                    required={true}
                                    placeholder="Nome do Titular"
                                    type={InputTypesEnum.text}
                                    consultPackage={viewConsultPackage}
                                    name="card-owner"
                                    disabled={true}
                                />
                                <TextInput
                                    required={true}
                                    placeholder="Número do Cartão"
                                    type={InputTypesEnum.text}
                                    consultPackage={viewConsultPackage}
                                    name="card-number"
                                    disabled={true}
                                />

                                <div className="md:flex justify-between w-full">
                                    <TextInput
                                        required={true}
                                        placeholder="Data de Vencimento"
                                        size="medium"
                                        type={InputTypesEnum.text}
                                        consultPackage={viewConsultPackage}
                                        name="card-expiration"
                                        disabled={true}
                                    />
                                    <TextInput
                                        required={true}
                                        placeholder="CVV"
                                        size="small"
                                        type={InputTypesEnum.text}
                                        consultPackage={viewConsultPackage}
                                        name="card-code"
                                        disabled={true}
                                    />
                                    <SelectInput
                                        placeholder="Bandeira"
                                        options={cardTypes}
                                        size="small"
                                        consultPackage={viewConsultPackage}
                                        name="card-type"
                                        disabled={true}
                                        required={true}
                                    />
                                </div>
                            </form>

                            <div className="mb-16 lg:w-8/12 lg:mx-auto flex items-center text-lg">
                                <input
                                    onClick={() => setTermIsAccepted(!termIsAccepted)}
                                    defaultChecked={termIsAccepted}
                                    type="checkbox"
                                    className="mr-3 h-12 w-12 sm:h-6 sm:w-6 cursor-pointer"
                                    name="accept"
                                    id="accept"
                                />
                                <label htmlFor="accept">
                                    <span>Eu aceito e concordo com os </span>
                                    <a
                                        className="text-primary hover:text-bright-purple font-medium"
                                        target="_blank"
                                        href="../../../resources/term-of-commitment.pdf"
                                    >
                                        Termos e condições gerais de uso
                                    </a>
                                </label>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-between w-full my-10 lg:w-8/12 lg:mx-auto">
                    {currentPage > pageConstraints.min && (
                        <FormButton text="Voltar" handleClick={() => setCurrentPage(currentPage - 1)} />
                    )}

                    <div></div>

                    {currentPage < pageConstraints.max && (
                        <FormButton text="Próximo" handleClick={() => setCurrentPage(currentPage + 1)} />
                    )}

                    {currentPage === pageConstraints.max && (
                        <FormButton
                            text="Confirmar"
                            handleClick={() => auth.registerCompany(registerData)}
                            isDisabled={!termIsAccepted}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CorpRegister;
