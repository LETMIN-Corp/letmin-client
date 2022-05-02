import Footer from '../Components/Layouts/Footer';
import Header from '../Components/Layouts/Header';
import FormInput from '../Components/Inputs/FormInput';
import { useState } from 'react';
import StripTitle from '../Components/Titles/StripTitle';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import Pagination from '../Components/Items/Pagination';
import InputTypesEnum from '../Utils/InputTypesEnum';

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
                                <div className='md:flex justify-between w-full'>
                                    <FormInput placeholder='Nome da Empresa' size='large' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-name' id='company-name' />
                                    <FormInput placeholder='CNPJ' size='medium' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-cnpj' id='company-cnpj' />
                                </div>
                                <div className='md:flex justify-between w-full'>
                                    <FormInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='company-email' id='company-email' />
                                    <FormInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='company-phone' id='company-phone' />
                                </div>
                                <FormInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-address' id='company-address' />
                            </form>

                            <h2 className='text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto'>Informações do Titular</h2>

                            <form className='lg:w-8/12 lg:mx-auto'>
                                <div className='md:flex justify-between w-full'>
                                    <FormInput placeholder='Nome do Titular' size='large' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='holder-name' id='holder-name' />
                                    <FormInput placeholder='CPF' type={ InputTypesEnum.text } size='medium' consultPackage={ consultPackage } name='holder-cpf' id='holder-cpf' />
                                </div>
                                <div className='md:flex justify-between w-full'>
                                    <FormInput placeholder='Email' size='large' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='holder-email' id='holder-email' />
                                    <FormInput placeholder='Telefone' size='medium' type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='holder-phone' id='holder-phone' />
                                </div>
                                <FormInput placeholder='Senha' type={ InputTypesEnum.password } consultPackage={ consultPackage } name='holder-password' id='holder-password' />
                                <FormInput placeholder='Confirmar senha' type={ InputTypesEnum.password } consultPackage={ consultPackage } name='holder-confirm-password' id='holder-confirm-password' />
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
                                <FormInput placeholder='Número do Cartão' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-number' id='card-number' />
                                <FormInput placeholder='Nome do Titular' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-owner' id='card-number' />
                                
                                <div className='md:flex justify-between w-full'>
                                    <FormInput placeholder='Data de Vencimento' size='medium' type={ InputTypesEnum.date } consultPackage={ consultPackage } name='card-due' id='card-due' />
                                    <FormInput placeholder='Tipo' size='small' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-type' id='card-type' />
                                    <FormInput placeholder='CVV' size='small'  type={ InputTypesEnum.text } consultPackage={ consultPackage } name='card-code' id='card-code' />
                                </div>
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
