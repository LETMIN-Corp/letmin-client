import { useEffect, useState  } from 'react';
import UserDefault from './UserDefault'
import SelectInput from '../../Components/Inputs/SelectInput';
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import MaskTypesEnum from '../../Utils/MaskTypesEnum';
import { Link } from 'react-router-dom';
import SecondaryLink from '../../Components/Links/SecondaryLink';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';

const UserVacancyDetail = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';
    }, []);

    interface IVacancyData {
        [key: string]: {
            [key: string]: string;
        };
    }
    
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
        <UserDefault>
            <div>
                <div className='flex justify-center items-center py-5 lg:py-10 bg-primary'>
                    <h1 className='text-white text-4xl lg:text-5xl font-black mt-4'>Detalhes da Vaga</h1>
                </div>
                {/*  */}

                <div className='p-5'>
                    <div className='bg-primary text-center md:text-left'> 
                    </div>

                    <div className='mt-5'>
                        <div className='flex items-center'>
                            <img src='https://via.placeholder.com/150'></img>
                            <div>
                                <p className='text-2xl ml-5 w-full font-medium'>Vaga para cargo</p>
                                <p className='text-xl ml-5 w-full'>Nome da Empresa</p>
                            </div>
                        </div>
                        <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                            <h1 className='text-2xl font-bold mb-5 text-primary'>
                                Informações sobre a Vaga
                            </h1>
                            <div className='md:flex md:justify-between'>
                                <div className='md:w-6/12 w-full mr-5'> 
                                    <TextInput placeholder='Região' type='text' name='vacancyInfo-region' id='vacancyInfo-region' value='Região' consultPackage={ consultPackage } disabled/>           
                                    <div className="md:flex justify-between">
                                        <TextInput placeholder='Moeda' type='text' size='medium' name='vacancyInfo-currency' id='vacancyInfo-currency' consultPackage={ consultPackage } value='Real' disabled/>  
                                        <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='vacancyInfo-salary' id='vacancyInfo-salary' consultPackage={ consultPackage } value='900,00' disabled/>  
                                    </div>   
                                    <TextInput placeholder='Tipo de Contratação' type='text' consultPackage={ consultPackage } name="vacancyInfo-type" id='vacancyInfo-type' value='Permanente' disabled/>    
                                    
                                    <TextInput placeholder='Carga Horária' type='text' consultPackage={ consultPackage } name="vacancyInfo-workload" id='vacancyInfo-workload' value='Integral' disabled/>     
                                </div>
                                <div className='md:w-6/12 w-full'>
                                    <TextInput placeholder='Setor' value='Operacional' type='text' consultPackage={ consultPackage } name="vacancyInfo-sector" id='vacancyInfo-sector' disabled/>   
                                    <TextAreaInput name="vacancyInfo-description" id="vacancyInfo-description" row={ 8 } consultPackage={ consultPackage } placeholder='Descrição' value='Aqui estará a descrição da vaga do candidato' disabled/>  
                                </div>
                            
                            </div> 
                            <div className='w-full flex justify-end '>
                                <SecondaryButton handleClick={()=>{}} text='Candidatar-se'></SecondaryButton>
                            </div>         
                        </div>
                        
                    </div>
                </div>
            </div>
        </UserDefault>
    );
}

export default UserVacancyDetail;
