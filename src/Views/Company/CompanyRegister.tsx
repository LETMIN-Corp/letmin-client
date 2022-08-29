import Footer from '../../Components/Layouts/Footer';
import Menu from '../../Components/Layouts/Menu';
import TextInput from '../../Components/Inputs/TextInput';
import { useEffect, useState } from 'react';
import StripTitle from '../../Components/Titles/StripTitle';
import Pagination from '../../Components/Items/Pagination';
import InputTypesEnum from '../../Utils/InputTypesEnum';
import MaskTypesEnum from '../../Utils/MaskTypesEnum';
import SelectInput from '../../Components/Inputs/SelectInput';
import FormButton from '../../Components/Buttons/FormButton';
import PlanCard from '../../Components/Cards/PlanCard';
import PlanTypesEnum from '../../Utils/PlanTypesEnum';
import ErrorModal from '../../Components/Modals/ErrorModal';
import { useNavigate } from 'react-router-dom';

const CorpRegister : React.FC = () => {
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
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [termIsAccepted, setTermIsAccepted] = useState(true);
    const [registerData, setRegisterData] = useState<IRegisterData>({
        company: {
            name: '',
            cnpj: '',
            address: '',
            phone: '',
            email: '',
        },
        holder: {
            name: '',
            cpf: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        plan: {
            selected: '',
        },
        card: {
            type: '',
            number: '',
            owner: '',
            due: '',
            code: '',
        }
    });

    interface IRegisterData {
        [key: string]: {
            [key: string]: string;
        };
    }

    function returnToRegisterPage () {
        navigate('/register');
    }

    function handleRegister() {
        navigate('/company/indicators');
    }

    function getInputValue (name: string): string {
        const [type, data] = name.split('-');

        return registerData[type][data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setRegisterData({
                ...registerData,
                [type]: { ...registerData[type], [data]: value
            }
        });
    }

    function setSelectedPlan (selectedPlan : string) : void {
        setRegisterData({
            ...registerData,
            plan: {
                selected: selectedPlan
            }
        });
    }

    function getSelectedPlan () : string {
        return registerData.plan.selected;
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }

    const viewConsultPackage = {
        getValue: getInputValue,
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    }

    const pageConstraints = {
        min: 0,
        max: 3,
    }

    const cardTypes = [
        'Mastercard',
        'Visa',
        'American Express',
        'Hipercard'        
    ]

    return (
        <>
            { modalIsOpen && <ErrorModal title='Sair do cadastro' text='Você pode perder seus dados. Tem certeza que deseja sair do cadastro?' handleClose={ () => setModalIsOpen(false) } handleConfirm={ returnToRegisterPage } /> }
            <Menu menuButtons={ pageButtons } />
            <StripTitle text='Cadastro de Empresa' />            
            <div className='w-screen min-h-screen p-5 md:px-20 md:py-10'>
                <Pagination max={ pageConstraints.max } current={ currentPage } handleClick={ setCurrentPage } />

                {
                    (currentPage === 0) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações da Empresa</h2>

                            <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                <div className='md:flex justify-between w-full'>
                                    <TextInput placeholder='Razão Social' size='large' limit={ 64 } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-name' id='company-name' />
                                    <TextInput placeholder='CNPJ' size='medium' useMask={ MaskTypesEnum.cnpj } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-cnpj' id='company-cnpj' />
                                </div>
                                <div className='md:flex justify-between w-full'>
                                    <TextInput placeholder='Email' size='large' limit={ 64 } type={ InputTypesEnum.email } consultPackage={ consultPackage } name='company-email' id='company-email' />
                                    <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='company-phone' id='company-phone' />
                                </div>
                                <TextInput placeholder='Endereço' limit={ 128 } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-address' id='company-address' />
                            </form>

                            <h2 className='text-xl font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações do Titular</h2>

                            <form className='lg:w-8/12 lg:mx-auto'>
                                <div className='md:flex justify-between w-full'>
                                    <TextInput placeholder='Nome do Titular' size='large' limit={ 64 } useMask={ MaskTypesEnum.holder } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='holder-name' id='holder-name' />
                                    <TextInput placeholder='CPF' type={ InputTypesEnum.text } size='medium' useMask={ MaskTypesEnum.cpf } consultPackage={ consultPackage } name='holder-cpf' id='holder-cpf' />
                                </div>
                                <div className='md:flex justify-between w-full'>
                                    <TextInput placeholder='Email' size='large' limit={ 64 } type={ InputTypesEnum.email } consultPackage={ consultPackage } name='holder-email' id='holder-email' />
                                    <TextInput placeholder='Telefone' size='medium' useMask={ MaskTypesEnum.phone } type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='holder-phone' id='holder-phone' />
                                </div>
                                <TextInput placeholder='Senha' limit={ 128 } type={ InputTypesEnum.password } consultPackage={ consultPackage } name='holder-password' id='holder-password' />
                                <TextInput placeholder='Confirmar Senha' limit={ 128 } type={ InputTypesEnum.password } consultPackage={ consultPackage } name='holder-confirmPassword' id='holder-confirmPassword' />
                            </form>
                        </>
                    )
                }

                {
                    (currentPage === 1) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Seleção de Assinatura</h2>

                            <div className='lg:mx-auto  lg:flex justify-center md:my-10 px-2'>
                                {
                                    [
                                        {
                                            title: 'Plano semestral',
                                            description: 'bbb',
                                            price: 'R$ 100,00 / Mês',
                                            text: 'ddd',
                                            features: [
                                                'Banco de talentos',
                                                'Lançamento de demandas',
                                                'Avaliação de perfil de candidato',
                                                'Envio de emails automatizados',
                                            ],
                                            type: PlanTypesEnum.semiannual,
                                            handleClick: () => setSelectedPlan(PlanTypesEnum.semiannual),
                                        },
                                        {
                                            title: 'Plano anual',
                                            description: 'fff',
                                            price: 'R$ 2000,00 / Ano',
                                            text: 'hhh',
                                            features: [
                                                'Banco de talentos',
                                                'Lançamento de demandas',
                                                'Avaliação de perfil de candidato',
                                                'Envio de emails automatizados',
                                            ],
                                            type: PlanTypesEnum.annual,
                                            handleClick: () => setSelectedPlan(PlanTypesEnum.annual),
                                        },
                                    ].map((card, key) => <PlanCard key={ key } card={ card } selected={ card.type === getSelectedPlan() } />)
                                }
                            </div>    
                        </>                        
                    )
                }

                {
                    (currentPage === 2) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações do Cartão</h2>

                            <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                <TextInput placeholder='Nome do Titular' limit={ 64 } useMask={ MaskTypesEnum.holder } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-owner' id='card-owner' />
                                <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ consultPackage } useMask={ MaskTypesEnum.cardNumber } name='card-number' id='card-number' />
                                
                                <div className='md:flex justify-between w-full'>
                                    <TextInput placeholder='Data de Vencimento' size='medium' useMask={ MaskTypesEnum.date } type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-due' id='card-due' />
                                    <TextInput placeholder='CVV' size='small' useMask={ MaskTypesEnum.cvv }  type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-code' id='card-code' />
                                    <SelectInput placeholder='Bandeira' options={cardTypes} size='small' consultPackage={consultPackage} name='card-type' id='card-type' disabled={false} />
                                </div>
                            </form>
                        </>
                    )
                }
                {
                    (currentPage === 3) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Confirmação de Dados</h2>

                            <div>
                                <h3 className='text-lg font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações da Empresa</h3>
                                <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                    <div className='md:flex justify-between w-full'>
                                        <TextInput placeholder='Razão Social' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-name' disabled={ true }/>
                                        <TextInput placeholder='CNPJ' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-cnpj' disabled={ true } />
                                    </div>
                                    <div className='md:flex justify-between w-full'>
                                        <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='company-email' disabled={ true }/>
                                        <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='company-phone' disabled={ true }/>
                                    </div>
                                    <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='company-address' disabled={ true }/>
                                </form>

                                <h3 className='text-lg font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações do Titular</h3>
                                <form className='lg:w-8/12 lg:mx-auto'>
                                    <div className='md:flex justify-between w-full'>
                                        <TextInput placeholder='Nome do Titular' size='large' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='holder-name' disabled={ true }/>
                                        <TextInput placeholder='CPF' type={ InputTypesEnum.text } size='medium' consultPackage={ viewConsultPackage } name='holder-cpf' disabled={ true }/>
                                    </div>
                                    <div className='md:flex justify-between w-full'>
                                        <TextInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ viewConsultPackage } name='holder-email' disabled={ true }/>
                                        <TextInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ viewConsultPackage } name='holder-phone' disabled={ true }/>
                                    </div>
                                </form>

                                <h3 className='text-lg font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações de Assinatura</h3>
                                <div className='lg:w-8/12 lg:mx-auto text-xl'>
                                    <TextInput placeholder='Plano Selecionado' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='plan-selected' disabled={ true }/>
                                </div>

                                <h3 className='text-lg font-bold my-5 md:text-2xl lg:w-8/12 lg:mx-auto'>Informações do Cartão</h3>
                                <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                    <TextInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-owner' disabled={ true }/>
                                    <TextInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-number' disabled={ true }/>
                                    
                                    <div className='md:flex justify-between w-full'>
                                        <TextInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-due' disabled={ true }/>
                                        <TextInput placeholder='CVV' size='small' type={ InputTypesEnum.text } consultPackage={ viewConsultPackage } name='card-code' disabled={ true }/>
                                        <SelectInput placeholder='Bandeira' options={ cardTypes } size='small' consultPackage={ viewConsultPackage } name='card-type' disabled={ true }/>
                                    </div>
                                </form>

                                <div className='mb-16 lg:w-8/12 lg:mx-auto flex items-center text-lg'>
                                    <input onClick={ () => setTermIsAccepted(!termIsAccepted) } type="checkbox" className='mr-3 h-5 w-5 cursor-pointer' name="accept" id="accept" />
                                    <label htmlFor='accept'>
                                        <span>Aceitar os </span>
                                        <a className='text-bright-purple font-medium'target='_blank' href='../../../resources/term-of-commitment.pdf'>termos de compromisso</a>
                                    </label>
                                </div>
                            </div>
                        </>
                    )
                }

                <div className='flex justify-between w-full my-10 lg:w-8/12 lg:mx-auto'>                    
                    {
                        (currentPage > pageConstraints.min) && (
                            <FormButton text='Voltar' handleClick={ () => setCurrentPage(currentPage - 1) } /> 
                        )
                    }

                    {
                        (currentPage < pageConstraints.max) && (
                            <FormButton text='Próximo' handleClick={ () => setCurrentPage(currentPage + 1) } />
                        )
                    }

                    {
                        (currentPage === pageConstraints.max) && (
                            <FormButton text='Confirmar' handleClick={ () => handleRegister() } isDisabled={ termIsAccepted } />
                        )
                    }
                </div>
            </div>  
            <Footer />
        </>
    );
}

export default CorpRegister;
