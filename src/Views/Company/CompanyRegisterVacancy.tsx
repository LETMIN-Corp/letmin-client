import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import FormButton from '../../Components/Buttons/FormButton';
import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCompany from '../../Utils/useCompany';

const CompanyRegisterVacancy = () => {
    const Company = useCompany();

    useEffect((): void => {
        window.document.title = 'Letmin - Inserção de Vagas';
    });

    interface IVacancyData {
        [key: string]: string;
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('data', vacancyData);

        Company.registerVacancy(Company.userData.user_id, vacancyData);
    };
    
    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        role: '',
        sector: '',
        description: '',
        salary: '',
        currency: '',
        workload: '',
        region: '',
        insertDate: '',
        expirationDate: '',
    });

    function getInputValue (name: string): string {
        return vacancyData[name];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;

        setVacancyData({
                ...vacancyData,
                [name]: value,
            }
        );
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }

    return (
        <CompanyDefault>
            <form className="p-5 min-h-screen" onSubmit={handleSubmit}>
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faBriefcase } className='mr-2' />
                    <span>Cadastro de Vagas</span>
                </h1>

                <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                    <h1 className='text-xl'>Dados da Vaga</h1>
                    <div className='md:flex md:justify-between'>
                        <div className='md:w-6/12 w-full mr-5'>
                            <TextInput placeholder='Cargo' type='text' name='role' id='role' consultPackage={ consultPackage }/> 
                            <SelectInput placeholder='Região' options={["Sul", "Sudeste", "Centro-Oeste", "Norte", "Nordeste"]} name='region' id='region' consultPackage={ consultPackage }/>                   
                            <TextAreaInput name="description" id="description" row={ 6 } consultPackage={ consultPackage } placeholder='Descrição'/>
                        </div>
                        <div className='md:w-6/12 w-full md:mt-1'>
                            <SelectInput placeholder='Carga Horária' options={["Integral", "Meio Período", "Home Office"]} consultPackage={ consultPackage } name="workload" id='workload'></SelectInput>     
                            <div className="md:flex justify-between">
                                <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='salary' id='salary' consultPackage={ consultPackage }/>  
                                <SelectInput placeholder='Moeda' options={["Real", "Dolar", "Euro"]} size='medium' consultPackage={ consultPackage } name="currency" id="currency"></SelectInput>  
                            </div>
                            <SelectInput placeholder='Setor' options={["Recursos Humanos", "Tecnologia", "Administrativo", "Financeiro", "Operacional"]} consultPackage={ consultPackage } name="sector" id='sector'></SelectInput>     
                            <div className='pb-2'>
                                <div className='text-dark-purple font-medium text-md'>
                                    Tipo de Contratação
                                </div>
                                <input type='radio' value="Estágio" id="vagaEstagio" name='type'></input>
                                <label className='text-lg' htmlFor='vagaEstagio'> Estágio</label><br></br>
                                <input type='radio' value="Permanente" id='Permanente' name='type'></input>
                                <label className='text-lg' htmlFor='Permanente'> Permanente</label><br></br>
                                <input type='radio' value="Temporário" id='Temporario' name='type'></input>
                                <label className='text-lg' htmlFor='Temporario'> Temporário</label><br></br>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
                <div className='w-full rounded-md mx-auto text-justify my-6 pt-2 text-8x1 md:mr-5'>
                    <h1 className='text-xl'>Dados Sistemáticos</h1>
                    <div className='md:flex md:justify-between'>
                        <div className='md:w-6/12 w-full mr-5'>
                            <TextInput placeholder='Lançamento de Vaga' type='date' name='insertDate' id='insertDate'consultPackage={ consultPackage }/>
                        </div>
                        <div className='md:w-6/12 w-full'>
                            <TextInput placeholder='Fechamento de Vaga' type='date' name='expirationDate' id='expirationDate' consultPackage={ consultPackage }/>  
                        </div>
                    
                    </div>
                    
                </div>
                
                <div className='flex w-full justify-end'>
                    <FormButton text='Cadastrar'/>
                </div>
            </form>
        </CompanyDefault>
    );
}

export default CompanyRegisterVacancy;
