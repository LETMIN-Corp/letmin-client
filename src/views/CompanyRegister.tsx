import Footer from "../Components/Footer";
import Header from "../Components/Header";
import FormInput from "../Components/FormInput";

const CorpRegister : React.FC = () => {
    return (
        <>
            <Header />
                <div className="flex justify-center py-10 bg-primary">
                    <h1 className="text-white text-4xl md:text-6xl font-black mt-20 text-center">Cadastro de Empresa</h1>
                </div>
                <div className="w-screen min-h-screen p-5 md:px-20 md:py-10">
                    <h2 className="text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto">Informações da Empresa</h2>

                    <form className="mb-10 lg:w-8/12 lg:mx-auto">
                        <FormInput label="Nome" type="text" name="company-name" id="company-name" />
                        <FormInput label="CNPJ" type="text" name="company-cnpj" id="company-cnpj" />
                        <FormInput label="Endereço" type="text" name="company-address" id="company-address" />
                        <FormInput label="Telefone" type="tel" name="company-phone" id="company-phone" />
                        <FormInput label="Email" type="email" name="company-email" id="company-email" />
                    </form>

                    <h2 className="text-xl font-bold my-5 md:text-3xl lg:w-8/12 lg:mx-auto">Informações do Titular</h2>

                    <form className="lg:w-8/12 lg:mx-auto">
                        <FormInput label="Nome" type="text" name="holder-name" id="holder-name" />
                        <FormInput label="CPF" type="text" name="holder-cpf" id="holder-cpf" />
                        <FormInput label="Telefone" type="tel" name="holder-phone" id="holder-phone" />
                        <FormInput label="Email" type="email" name="holder-email" id="holder-email" />
                        <FormInput label="Senha" type="password" name="holder-password" id="holder-password" />
                        <FormInput label="Confirmar senha" type="password" name="holder-confirm-password" id="holder-confirm-password" />
                    </form>

                    <div className="flex justify-between w-full my-10 lg:w-8/12 lg:mx-auto">
                        <button className="bg-primary text-white text-center w-32 py-2 rounded-full drop-shadow-lg text-lg">Voltar</button> 
                        <button className="bg-primary text-white text-center w-32 py-2 rounded-full drop-shadow-lg text-lg">Próximo</button> 
                    </div>
                </div>            
            <Footer />
        </>
    );
}

export default CorpRegister;
