import { useEffect, useState  } from 'react';
import UserDefault from './UserDefault'
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import MaskTypesEnum from '../../Enums//MaskTypesEnum';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { useNavigate, useParams } from "react-router-dom";
import useUser from '../../Utils/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const UserVacancyDetail = () => {
    const params = useParams();
    const user = useUser();
    const navigate = useNavigate();
    const id = params.id;

    useEffect((): void => {
        window.document.title = 'Letmin - Buscar Vagas';

        if (id?.length !== 24) {
            navigate('/user/vacancy/search');
            return;
        }

        user.getVacancy(id).then((res: any) => {
            if(!res.data.success || res.data.vacancy.closed) {
                navigate('/user/vacancy/search');
            }

            setVacancyData(res.data.vacancy);
        })

    }, []);
    interface IVacancyData {
        [key: string]: string;
    }

    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        role: '',
        sector: '',
        description: '',
        salary: '',
        currency: '',
        workload: '',
        region: '',
        vacancyType: '',
    });

    function getInputValue (name: string): string {
        const [type, data] = name.split('-');
        return vacancyData[data];
    }

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setVacancyData({
            ...vacancyData,
            [type]: { 
                ...vacancyData[type], [data]: value,
            },
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
                <div className='p-5'>
                    <div className='bg-primary text-center md:text-left'> 
                    </div>

                    <div className='mt-5'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon icon={ faBuilding } className='text-8xl' />
                            <div>
                                <p className='text-2xl ml-5 w-full font-medium'>{ vacancyData.role }</p>
                                <p className='text-xl ml-5 w-full'>{ vacancyData.company ? vacancyData.company.company.name : '' }</p>
                            </div>
                        </div>
                        <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                            <h1 className='text-2xl font-bold mb-5 text-primary'>
                                Informações sobre a Vaga
                            </h1>
                            <div className='md:flex md:justify-between'>
                                <div className='md:w-6/12 w-full mr-5'> 
                                    <TextInput placeholder='Setor' value='Operacional' type='text' consultPackage={ consultPackage } name="vacancyInfo-sector" id='vacancyInfo-sector' disabled/>                                      
                                    <TextAreaInput name="vacancyInfo-description" id="vacancyInfo-description" row={ 8 } consultPackage={ consultPackage } placeholder='Descrição' value={ vacancyData.description } disabled/>  
                                </div>
                                <div className='md:w-6/12 w-full'>
                                    <TextInput placeholder='Região' type='text' name='vacancyInfo-region' id='vacancyInfo-region' value='Região' consultPackage={ consultPackage } disabled/>           
                                    <div className="md:flex justify-between">
                                        <TextInput placeholder='Moeda' type='text' size='medium' name='vacancyInfo-currency' id='vacancyInfo-currency' consultPackage={ consultPackage } value='Real' disabled/>
                                        <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='vacancyInfo-salary' id='vacancyInfo-salary' consultPackage={ consultPackage } value='900,00' disabled/>
                                    </div>                                    
                                    <TextInput placeholder='Carga Horária' type='text' consultPackage={ consultPackage } name="vacancyInfo-workload" id='vacancyInfo-workload' value='Integral' disabled/>
                                </div>
                            
                            </div> 
                            <div className='w-full flex justify-end '>
                                <SecondaryButton handleClick={ () => {} } text='Candidatar-se'></SecondaryButton>
                            </div>         
                        </div>
                        
                    </div>
                </div>
            </div>
        </UserDefault>
    );
}

export default UserVacancyDetail;
