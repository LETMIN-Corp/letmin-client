import Footer from '../Components/Layouts/Footer';
import Header from '../Components/Layouts/Header';
import FormInput from '../Components/Inputs/FormInput';
import { useState } from 'react';
import StripTitle from '../Components/Titles/StripTitle';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import Pagination from '../Components/Items/Pagination';

const CorpRegister : React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [registerData, setRegisterData] = useState({
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
        card: {
            type: '',
            number: '',
            owner: '',
            due: '',
            code: '',
        }
    });

    function getValue(name: string) {
        const [type, data] = name.split('-');

        return registerData[type][data];
    }

    function setValue(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setRegisterData({
                ...registerData,
                [type]: { ...registerData[type], [data]: value
            }
        });
    }

    const consultPackage = {
        getValue: getValue,
        setValue: setValue, 
    }

    const pageConstraints = {
        min: 0,
        max: 2,
    }

    return (
        <>
            <Header />
            <StripTitle text='Cadastro de Empresa' />
            <div className='w-screen min-h-screen p-5 md:px-20 md:py-10'>
                <Pagination max={ pageConstraints.max } current={ currentPage } handleClick={ setCurrentPage } />

                {
                    (currentPage === 0) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto'>Informações da Empresa</h2>

                            <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                <FormInput label='Nome' type='text' consultPackage={ consultPackage } name='company-name' id='company-name' />
                                <FormInput label='CNPJ' type='text' consultPackage={ consultPackage } name='company-cnpj' id='company-cnpj' />
                                <FormInput label='Endereço' type='text' consultPackage={ consultPackage } name='company-address' id='company-address' />
                                <FormInput label='Telefone' type='tel' consultPackage={ consultPackage } name='company-phone' id='company-phone' />
                                <FormInput label='Email' type='email' consultPackage={ consultPackage } name='company-email' id='company-email' />
                            </form>

                            <h2 className='text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto'>Informações do Titular</h2>

                            <form className='lg:w-8/12 lg:mx-auto'>
                                <FormInput label='Nome' type='text' consultPackage={ consultPackage } name='holder-name' id='holder-name' />
                                <FormInput label='CPF' type='text' consultPackage={ consultPackage } name='holder-cpf' id='holder-cpf' />
                                <FormInput label='Telefone' type='tel' consultPackage={ consultPackage } name='holder-phone' id='holder-phone' />
                                <FormInput label='Email' type='email' consultPackage={ consultPackage } name='holder-email' id='holder-email' />
                                <FormInput label='Senha' type='password' consultPackage={ consultPackage } name='holder-password' id='holder-password' />
                                <FormInput label='Confirmar senha' type='password' consultPackage={ consultPackage } name='holder-confirm-password' id='holder-confirm-password' />
                            </form>
                        </>
                    )
                }

                {
                    (currentPage === 1) && (
                        <div className='text-center'>...</div>
                    )
                }

                {
                    (currentPage === 2) && (
                        <>
                            <h2 className='text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto'>Informações do Cartão</h2>

                            <form className='mb-10 lg:w-8/12 lg:mx-auto'>
                                <FormInput label='Tipo de Cartão' type='text' consultPackage={ consultPackage } name='card-type' id='card-type' />
                                <FormInput label='Número do Cartão' type='text' consultPackage={ consultPackage } name='card-number' id='card-number' />
                                <FormInput label='Nome do Titular' type='text' consultPackage={ consultPackage } name='card-owner' id='card-number' />
                                <FormInput label='Data de Vencimento' type='date' consultPackage={ consultPackage } name='card-due' id='card-due' />
                                <FormInput label='Código de Segurança' type='text' consultPackage={ consultPackage } name='card-code' id='card-code' />
                            </form>
                        </>
                    )
                }

                <div className='flex justify-between w-full my-10 lg:w-8/12 lg:mx-auto'>                    
                    {
                        (currentPage > pageConstraints.min) && (
                            <SecondaryButton text='Voltar' handleClick={ () => setCurrentPage(currentPage - 1) } /> 
                        )
                    }

                    <div></div>

                    {
                        (currentPage < pageConstraints.max) && (
                            <SecondaryButton text='Próximo' handleClick={ () => setCurrentPage(currentPage + 1) } />
                        )
                    }
                </div>
            </div>  
            <Footer />
        </>
    );
}

export default CorpRegister;
