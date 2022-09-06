import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import FormButton from '../../Components/Buttons/FormButton';
import { useNavigate } from 'react-router-dom';
import CompanyDefault from './CompanyDefault';
import { useEffect, useState } from 'react';
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const CompanyRegisterVacancy = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Inserção de Vagas';
    });

    interface IVacancyData {
        [key: string]: {
            [key: string]: string;
        };
    }

    const navigate = useNavigate();
    
    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        vacancyInfo: {
            role: '',
            sector: '',
            description: '',
            salary: '',
            currency: '',
            workload: '',
            region: '',
            vacancyType: '',
        },
        systemicData: {
            insertVacancyDate: '',
            removeVacancyDate: '',
        },
    });

    function getInputValue (name: string): string {
        const [type, data] = name.split('-');

        return vacancyData[type][data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setVacancyData({
                ...vacancyData,
                [type]: { ...vacancyData[type], [data]: value
            }
        });
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue, 
    }

    return (
        <CompanyDefault>
            <div className="p-5 min-h-screen">
                <h1 className='text-2xl'>
                    <FontAwesomeIcon icon={ faBriefcase } className='mr-2' />
                    <span>Cadastro de Vagas</span>
                </h1>

                <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                    <h1 className='text-xl'>Dados da Vaga</h1>
                    <div className='md:flex md:justify-between'>
                        <div className='md:w-6/12 w-full mr-5'>
                            <TextInput placeholder='Cargo' type='text' name='vacancyInfo-role' id='vacancyInfo-role' consultPackage={ consultPackage }/> 
                            <TextInput placeholder='Região' type='text' name='vacancyInfo-region' id='vacancyInfo-region' consultPackage={ consultPackage }/>                   
                            <TextAreaInput name="vacancyInfo-description" id="vacancyInfo-description" row={ 6 } consultPackage={ consultPackage } placeholder='Descrição'/>
                        </div>
                        <div className='md:w-6/12 w-full md:mt-1'>
                            <SelectInput placeholder='Carga Horária' options={["Integral", "Meio Período", "Folguista", "Flexível"]} consultPackage={ consultPackage } name="vacancyInfo-workload" id='vacancyInfo-workload'></SelectInput>     
                            <div className="md:flex justify-between">
                                <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='vacancyInfo-salary' id='vacancyInfo-salary' consultPackage={ consultPackage }/>  
                                <SelectInput placeholder='Moeda' options={["Real", "Dolar", "Euro"]} size='medium' consultPackage={ consultPackage } name="vacancyInfo-currency" id="vacancyInfo-currency"></SelectInput>  
                            </div>
                            <SelectInput placeholder='Setor' options={["Recursos Humanos", "Tecnologia", "Administrativo", "Financeiro", "Operacional"]} consultPackage={ consultPackage } name="vacancyInfo-sector" id='vacancyInfo-sector'></SelectInput>     
                            <div className='pb-2'>
                                <div className='text-dark-purple font-medium text-md'>
                                    Tipo de Contratação
                                </div>
                                <input type='radio' value="Estágio" id="vagaEstagio" name='vacancyInfo-type'></input>
                                <label className='text-lg' htmlFor='vagaEstagio'> Estágio</label><br></br>
                                <input type='radio' value="Permanente" id='Permanente' name='vacancyInfo-type'></input>
                                <label className='text-lg' htmlFor='Permanente'> Permanente</label><br></br>
                                <input type='radio' value="Temporário" id='Temporario' name='vacancyInfo-type'></input>
                                <label className='text-lg' htmlFor='Temporario'> Temporário</label><br></br>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
                <div className='w-full rounded-md mx-auto text-justify my-6 pt-2 text-8x1 md:mr-5'>
                    <h1 className='text-xl'>Dados Sistemáticos</h1>
                    <div className='md:flex md:justify-between'>
                        <div className='md:w-6/12 w-full mr-5'>
                            <TextInput placeholder='Lançamento de Vaga' type='date' name='systemicData-insertVacancyDate' id='systemicData-insertVacancyDate'consultPackage={ consultPackage }/>
                        </div>
                        <div className='md:w-6/12 w-full'>
                            <TextInput placeholder='Fechamento de Vaga' type='date' name='systemicData-removeVacancyDate' id='systemicData-removeVacancyDate' consultPackage={ consultPackage }/>  
                        </div>
                    
                    </div>
                    
                </div>
                
                <div className='flex w-full justify-end'>
                    <FormButton text='Cadastrar' handleClick={ () => {} }/>
                </div>
            </div>
        </CompanyDefault>
    );
}

export default CompanyRegisterVacancy;
