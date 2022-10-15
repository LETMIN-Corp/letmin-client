import { useEffect, useState  } from 'react';
import UserDefault from './UserDefault'
import TextInput from '../../Components/Inputs/TextInput';
import TextAreaInput from '../../Components/Inputs/TextAreaInput';
import MaskTypesEnum from '../../Enums/MaskTypesEnum';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { useNavigate, useParams } from "react-router-dom";
import useUser from '../../Utils/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { dispatchError, dispatchSuccess } from '../../Utils/ToastMessages';
import useLoading from '../../Utils/useLoading';
import Loading from '../../Components/Items/Loading';
import useAuth from '../../Utils/useAuth';
import { Link } from 'react-router-dom';
import InputTypesEnum from '../../Enums/InputTypesEnum';

const UserCompanyDetail = () => {
    const params = useParams();
    const user = useUser();
    const auth = useAuth();
    const navigate = useNavigate();

    const { loading } = useLoading();
    const id = params.id;
    const [applied, setApplied] = useState(false);

    useEffect((): void => {
        window.document.title = 'Letmin - Vaga';

        if (id?.length !== 24) {
            navigate('/user/company/search');
            return;
        }

        user.getCompany(id).then((res: any) => {
            if(!res.data.success || res.data.vacancy.closed) {
                navigate('/user/company/search');
            }
            setApplied(res.data.vacancy.candidates.filter((candidate: any) => candidate._id == auth.userData.user_id ).length > 0)
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

    return (
        <UserDefault>
            <div className='p-5 min-h-screen'>
                {
                    loading ? <Loading />
                    : (
                        <div>
                            <div className='flex items-center'>
                                <FontAwesomeIcon icon={ faBuilding } className='text-8xl' />
                                <div>
                                    <h1 className='text-2xl ml-5 w-full font-bold text-primary'>Nome{ vacancyData.role }</h1>
                                    <div className='text-xl ml-5 w-full font-medium text-dark-purple'>Representante Legal{ vacancyData.company.company.name }</div>
                                </div>
                            </div>
                            <h3 className='text-lg font-bold my-5 text-dark-purple lg:mx-auto'>Informações da Empresa</h3>
                            <div>
                                <div className='flex justify-between'>
                                    <div className='md:w-6/12 w-full mr-5'>
                                        <TextInput required={ true } placeholder='Razão Social' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-name' disabled={ true } />
                                        <TextInput required={ true } placeholder='CNPJ' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-cnpj' disabled={ true } />
                                    </div>
                                    <div className='md:w-6/12 w-full mr-5'>
                                        <TextInput required={ true } placeholder='E-mail' type={ InputTypesEnum.email } consultPackage={ consultPackage } name='company-email' disabled={ true }/>
                                        <TextInput required={ true } placeholder='Telefone' type={ InputTypesEnum.tel } consultPackage={ consultPackage } name='company-phone' disabled={ true }/>
                                    </div>
                                </div>
                                <TextInput placeholder='Endereço' type={ InputTypesEnum.text } consultPackage={ consultPackage } name='company-address' disabled={ true }/>
                            </div>

                            <h3 className='text-lg font-bold my-5 text-dark-purple lg:mx-auto'>Vagas Disponíveis</h3>

                        </div>
                    )
                }
            </div>
        </UserDefault>
    );
}

export default UserCompanyDetail;
