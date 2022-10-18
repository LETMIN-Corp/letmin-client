import { faBan, faBuilding, faInfo, faMagnifyingGlass, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../../Components/Inputs/TextInput';
import Loading from '../../Components/Items/Loading';
import InfoModal from '../../Components/Modals/InfoModal';
import InputTypesEnum from '../../Enums//InputTypesEnum';
import useAdmin from '../../Utils/useAdmin';
import useLoading from '../../Utils/useLoading';
import AdminDefault from './AdminDefault';

const AdminCompany: React.FC = () => {
    const admin = useAdmin();
    const { loading } = useLoading();

    const [searchCompany, setSearchCompany] = useState('');

    const [allCompanies, setAllCompanies] = useState<any[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [selectedCompanyKey, setSelectedCompanyKey] = useState(0);

    useEffect((): void => {
        window.document.title = 'Letmin - Empresas';

        admin.getAllCompanies().then((res: any) => {
            if (res.status !== 200) {
                setCompanies([]);
                setAllCompanies([]);
                return;
            }
            setCompanies(res.data.companies);
            setAllCompanies(res.data.companies);
        });
    }, []);

    const [openModal, setOpenModal] = useState(false);

    function handleOpen(key: number): void {
        setSelectedCompanyKey(key);
        setOpenModal(true);
    }

    function handleCompanyBlock(id: string): void {
        admin.blockCompany(id).then((res: any) => {
            setCompanies(res.data.companies);
            setAllCompanies(res.data.companies);
        });
    }

    const filterCompanies = (search: string) => {
        if (search == '') {
            return setCompanies(allCompanies);
        }

        const filteredCompanies = allCompanies.filter((company: any) => {
            return company.company.name.toLowerCase().includes(search.toLowerCase());
        });

        setCompanies(filteredCompanies);
    };

    useEffect((): void => {
        filterCompanies(searchCompany);
    }, [searchCompany]);

    return (
        <AdminDefault>
            <div className="p-5 min-h-90">
                <h1 className="text-2xl">
                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                    Empresas
                </h1>
                <div className="max-w-sm w-full relative mt-5">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full pl-2 pr-8 py-1 border-2 border-dark-purple rounded-md"
                        name="search"
                        onChange={(e) => setSearchCompany(e.target.value)}
                        id="search"
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute right-2 top-2 text-xl text-dark-purple"
                    />
                </div>
                {loading ? (
                    <Loading />
                ) : companies.length == 0 ? (
                    <div className="mt-5 text-center md:text-left text-dark-purple text-lg font-medium">
                        Nenhuma empresa encontrada
                    </div>
                ) : (
                    <div className="mt-5 break-all">
                        <div className="text-sm md:text-md font-medium flex justify-between w-full px-1">
                            <span className="w-5/12 md:w-7/12 pr-1">Razão Social</span>
                            <span className="w-4/12 pr-1">Status</span>
                            <span className="w-3/12 md:w-12 pr-1">Ações</span>
                        </div>
                        <div>
                            {companies.map((company, key) => (
                                <TableCard
                                    key={key}
                                    companyData={company}
                                    handleOpen={() => handleOpen(key)}
                                    handleCompanyBlock={() => handleCompanyBlock(company._id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {openModal && (
                <CompanyForm
                    isDisabled={true}
                    companies={companies}
                    selectedCompanyKey={selectedCompanyKey}
                    handleClose={() => setOpenModal(false)}
                />
            )}
        </AdminDefault>
    );
};

interface TableCardInterface {
    companyData: {
        _id: string;
        company: {
            name: string;
            cnpj: string;
            email: string;
            phone: string;
            address: string;
        };
        holder: {
            name: string;
            email: string;
            phone: string;
        };
        plan: {
            selected: string;
        };
        status: {
            blocked: boolean;
        };
    };
    handleOpen: () => void;
    handleCompanyBlock: () => void;
}

const TableCard: React.FC<TableCardInterface> = ({ companyData, handleOpen, handleCompanyBlock }) => {
    const Admin = useAdmin();

    return (
        <div className="text-sm bg-lilac py-2 px-1 md:px-2 rounded-sm flex items-center justify-between mt-2">
            <span className="w-5/12 md:w-7/12 pr-1">
                <Link
                    to={`/admin/empresa/${companyData._id}`}
                    className="text-dark-purple font-medium hover:text-purple-600"
                >
                    {companyData.company.name}
                </Link>
            </span>
            <span className="w-4/12 pr-1">{companyData.status.blocked ? 'Bloqueado' : 'Ativo'}</span>
            <span className="w-3/12 md:w-12 md:text-lg pr-1 flex justify-between">
                <div className="cursor-pointer">
                    <FontAwesomeIcon icon={faInfo} onClick={handleOpen} className="text-dark-purple" />
                </div>
                <div className="cursor-pointer" onClick={() => handleCompanyBlock()}>
                    {!companyData.status.blocked ? (
                        <FontAwesomeIcon icon={faBan} className="text-red" />
                    ) : (
                        <FontAwesomeIcon icon={faUnlock} className="text-primary" />
                    )}
                </div>
            </span>
        </div>
    );
};

interface CompanyFormInterface {
    isDisabled: boolean;
    companies: [] | any;
    selectedCompanyKey: number;
    handleClose: () => void;
}

const CompanyForm: React.FC<CompanyFormInterface> = ({ isDisabled, companies, selectedCompanyKey, handleClose }) => {
    const viewConsultPackage = {
        getValue: (name: string) => {
            const [type, data] = name.split('-');
            return companies[selectedCompanyKey][type][data];
        },
        setValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {},
    };

    return (
        <InfoModal title="Informações" handleClose={handleClose} showIcon={false}>
            <h2 className="text-lg">Titular</h2>
            <form className="mt-2">
                <TextInput
                    placeholder="Nome do Titular"
                    type={InputTypesEnum.text}
                    consultPackage={viewConsultPackage}
                    name="holder-name"
                    disabled={isDisabled}
                />
                <div className="md:flex justify-between w-full">
                    <TextInput
                        placeholder="E-mail"
                        size="extra-large"
                        type={InputTypesEnum.email}
                        consultPackage={viewConsultPackage}
                        name="holder-email"
                        disabled={isDisabled}
                    />
                    <TextInput
                        placeholder="Telefone"
                        size="normal"
                        type={InputTypesEnum.tel}
                        consultPackage={viewConsultPackage}
                        name="holder-phone"
                        disabled={isDisabled}
                    />
                </div>
            </form>

            <h2 className="text-lg">Empresa</h2>
            <form className="mt-2">
                <TextInput
                    placeholder="Razão Social"
                    type={InputTypesEnum.text}
                    consultPackage={viewConsultPackage}
                    name="company-name"
                    disabled={isDisabled}
                />
                <div className="md:flex justify-between w-full">
                    <TextInput
                        placeholder="CNPJ"
                        size="extra-large"
                        type={InputTypesEnum.text}
                        consultPackage={viewConsultPackage}
                        name="company-cnpj"
                        disabled={isDisabled}
                    />
                    <TextInput
                        placeholder="Plano"
                        size="normal"
                        type={InputTypesEnum.text}
                        consultPackage={viewConsultPackage}
                        name="plan-selected"
                        disabled={isDisabled}
                    />
                </div>
                <div className="md:flex justify-between w-full">
                    <TextInput
                        placeholder="E-mail"
                        size="extra-large"
                        type={InputTypesEnum.email}
                        consultPackage={viewConsultPackage}
                        name="holder-email"
                        disabled={isDisabled}
                    />
                    <TextInput
                        placeholder="Telefone"
                        size="normal"
                        type={InputTypesEnum.tel}
                        consultPackage={viewConsultPackage}
                        name="holder-phone"
                        disabled={isDisabled}
                    />
                </div>
                <TextInput
                    placeholder="Endereço"
                    type={InputTypesEnum.text}
                    consultPackage={viewConsultPackage}
                    name="company-address"
                    disabled={isDisabled}
                />
            </form>
        </InfoModal>
    );
};

export default AdminCompany;
