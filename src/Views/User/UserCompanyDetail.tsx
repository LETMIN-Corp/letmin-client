import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserCompanyVacancyCard from '../../Components/Cards/UserCompanyVacancyCard';
import TextInput from '../../Components/Inputs/TextInput';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import useAuth from '../../Utils/useAuth';
import useLoading from '../../Utils/useLoading';
import useUser from '../../Utils/useUser';
import UserDefault from './UserDefault';

const UserCompanyDetail = () => {
    const params = useParams();
    const user = useUser();
    const auth = useAuth();
    const navigate = useNavigate();

    const { loading } = useLoading();
    const id = params.id;

    interface ICompanyData {
        [key: string]: any;
    }

    const [companyData, setCompanyData] = useState<ICompanyData>({
        company: {
            name: '',
            cnpj: '',
            email: '',
            phone: '',
            address: '',
            description: '',
        },
        holder: {
            name: '',
            cpf: '',
            email: '',
            phone: '',
        },
        vacancies: {
            role: '',
            sector: '',
            description: '',
            currency: '',
            salary: 0,
        },
    });

    const [vacancyCards, setVacancyCards] = useState<ICompanyData>({});

    useEffect((): void => {
        window.document.title = 'Letmin - Empresa';

        if (id?.length !== 24) {
            navigate('/user/company/search');
            return;
        }

        user.getCompany(id).then((res: any) => {
            if (!res.data.success) {
                navigate('/user/company/search');
            }
            setCompanyData(res.data.data);
            const cards: any[] = res.data.data.vacancies.map((vacancy: any) => (
                <UserCompanyVacancyCard vacancy={vacancy} key={vacancy._id} />
            ));
            setVacancyCards(cards);
        });
    }, []);

    function setInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        const [type, data] = name.split('-');

        setCompanyData({
            ...companyData,
            [type]: { ...companyData[type], [data]: value },
        });
    }

    function getInputValue(name: string): string {
        const [type, data] = name.split('-');

        return companyData[type][data];
    }

    const consultPackage = {
        getValue: getInputValue,
        setValue: setInputValue,
    };

    return (
        <UserDefault>
            <div className="p-5 min-h-screen">
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBuilding} className="text-8xl" />
                            <div>
                                <h1 className="text-2xl ml-5 w-full font-bold text-primary">
                                    {companyData.company.name}
                                </h1>
                                <div className="text-xl ml-5 w-full font-medium text-dark-purple">
                                    {companyData.holder.name}
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold my-5 text-dark-purple lg:mx-auto">Informações da Empresa</h3>
                        <div>
                            <div className="md:flex md:justify-between">
                                <div className="md:w-6/12 w-full mr-5">
                                    <TextInput
                                        placeholder="Razão Social"
                                        type={InputTypesEnum.text}
                                        consultPackage={consultPackage}
                                        name="company-name"
                                        disabled={true}
                                    />
                                    <TextInput
                                        placeholder="CNPJ"
                                        type={InputTypesEnum.text}
                                        consultPackage={consultPackage}
                                        name="company-cnpj"
                                        disabled={true}
                                    />
                                </div>
                                <div className="md:w-6/12 w-full mr-5">
                                    <TextInput
                                        placeholder="E-mail"
                                        type={InputTypesEnum.email}
                                        consultPackage={consultPackage}
                                        name="company-email"
                                        disabled={true}
                                    />
                                    <TextInput
                                        placeholder="Telefone"
                                        type={InputTypesEnum.tel}
                                        consultPackage={consultPackage}
                                        name="company-phone"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <TextInput
                                placeholder="Endereço"
                                type={InputTypesEnum.text}
                                consultPackage={consultPackage}
                                name="company-address"
                                disabled={true}
                            />
                        </div>

                        <h3 className="text-lg font-bold my-5 text-dark-purple lg:mx-auto">Vagas Disponíveis</h3>
                        <div>
                            {!!vacancyCards.length && (
                                <List
                                    data={vacancyCards}
                                    itemsPerPage={6}
                                    style="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                ></List>
                            )}
                            {!vacancyCards.length && (
                                <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                                    Não há vagas disponíveis
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </UserDefault>
    );
};

export default UserCompanyDetail;
