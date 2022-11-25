import { faBuilding, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AdminCompanyVacancyCard from '../../Components/Cards/AdminCompanyVacancyCard';
import TextInput from '../../Components/Inputs/TextInput';
import List from '../../Components/Items/List';
import Loading from '../../Components/Items/Loading';
import InputTypesEnum from '../../Enums/InputTypesEnum';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import AdminDefault from './AdminDefault';

const AdminCompanyData: React.FC = () => {
    const admin = useAdmin();
    const { loading } = useLoading();

    const navigate = useNavigate();
    const params = useParams();
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

    useEffect((): void => {
        window.document.title = 'Letmin - Empresa';

        if (id?.length !== 24) {
            return navigate('/admin');
        }

        admin.getCompany(id).then((res: any) => {
            if (!res.data.success) {
                navigate('/admin');
            }
            setCompanyData(res.data.company);
            const cards: any[] = res.data.company.vacancies.map((vacancy: any) => (
                <AdminCompanyVacancyCard vacancy={vacancy} key={vacancy._id} />
            ));
            setVacancyCards(cards);
        });
    }, []);

    return (
        <AdminDefault>
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
                            {
                                companyData.company.description && (
                                    <TextInput
                                        placeholder="Descrição"
                                        type={InputTypesEnum.text}
                                        consultPackage={consultPackage}
                                        name="company-description"
                                        disabled={true}
                                    />
                                )
                            }
                            <h3 className="text-lg font-bold my-5 text-dark-purple lg:mx-auto">Informações do Responsável</h3>
                            <div className="md:flex md:justify-between">
                                <div className="md:w-6/12 w-full mr-5">
                                    <TextInput
                                        placeholder="Nome"
                                        type={InputTypesEnum.text}
                                        consultPackage={consultPackage}
                                        name="holder-name"
                                        disabled={true}
                                    />
                                    <TextInput

                                        placeholder="CPF"
                                        type={InputTypesEnum.text}
                                        consultPackage={consultPackage}
                                        name="holder-cpf"
                                        disabled={true}
                                    />
                                </div>
                                <div className="md:w-6/12 w-full mr-5">
                                    <TextInput
                                        placeholder="E-mail"
                                        type={InputTypesEnum.email}
                                        consultPackage={consultPackage}
                                        name="holder-email"
                                        disabled={true}
                                    />
                                    <TextInput
                                        placeholder="Telefone"
                                        type={InputTypesEnum.tel}
                                        consultPackage={consultPackage}
                                        name="holder-phone"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold my-5 text-dark-purple lg:mx-auto">Vagas Disponíveis {vacancyCards.length > 0 && `(${vacancyCards.length})`}</h3>
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
        </AdminDefault>
    );
};

export default AdminCompanyData;
