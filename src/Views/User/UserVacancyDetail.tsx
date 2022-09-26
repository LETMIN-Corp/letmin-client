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
import { dispatchError, dispatchSuccess } from '../../Utils/ToastMessages';

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
        [key: string]: any
    }

    const [vacancyData, setVacancyData] = useState<IVacancyData>({
        _id: '',
        role: '',
        sector: '',
        description: '',
        company: {
            company: {
                name: '',
            }
        },
        salary: '',
        currency: '',
        workload: '',
        region: '',
        vacancyType: '',
    });

    function setInputValue (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        setVacancyData({
            ...vacancyData,
            [e.target.name]: e.target.value
        });
    }

    const consultPackage = {
        getValue: (key: string) => { return vacancyData[key]; },
        setValue: setInputValue, 
    }

    const handleApplyVacancy = () => {
        user.applyVacancy(id).then((res: any) => {
            if(res.data.success) {
                dispatchSuccess(res.data.message);
                return navigate('/user/vacancy/search');
            }
            dispatchError(res.data.message);
        })
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
                                <p className='text-xl ml-5 w-full'>{ vacancyData.company.company.name }</p>
                            </div>
                        </div>
                        <div className='w-full rounded-md mx-auto text-justify mt-4 pt-2 text-8x1 md:mr-5'>
                            <h1 className='text-2xl font-bold mb-5 text-primary'>
                                Informações sobre a Vaga
                            </h1>
                            <div className='md:flex md:justify-between'>
                                <div className='md:w-6/12 w-full mr-5'> 
                                    <TextInput placeholder='Setor' value='Operacional' type='text' consultPackage={ consultPackage } name="sector" id='sector' disabled/>                                      
                                    <TextAreaInput name="description" id="description" row={ 8 } consultPackage={ consultPackage } placeholder='Descrição' value={ vacancyData.description } disabled/>  
                                </div>
                                <div className='md:w-6/12 w-full'>
                                    <TextInput placeholder='Região' type='text' name='region' id='region' value='Região' consultPackage={ consultPackage } disabled/>           
                                    <div className="md:flex justify-between">
                                        <TextInput placeholder='Moeda' type='text' size='medium' name='currency' id='currency' consultPackage={ consultPackage } value='Real' disabled/>
                                        <TextInput placeholder='Salário' useMask={ MaskTypesEnum.money } limit={ 12 } type='text' size='large' name='salary' id='salary' consultPackage={ consultPackage } value='900,00' disabled/>
                                    </div>                                    
                                    <TextInput placeholder='Carga Horária' type='text' consultPackage={ consultPackage } name="workload" id='workload' value='Integral' disabled/>
                                </div>
                            
                            </div> 
                            <div className='w-full flex justify-end '>
                                <SecondaryButton handleClick={ handleApplyVacancy } text='Candidatar-se'></SecondaryButton>
                            </div>         
                        </div>
                        
                    </div>
                </div>
            </div>
        </UserDefault>
    );
}

export default UserVacancyDetail;
