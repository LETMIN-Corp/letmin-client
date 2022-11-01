import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import CookiesPopUp from './Components/Items/CookiesPopUp';
import RoleEnum from './Enums//RoleEnum';
import PrivateRoutes from './Routes/PrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes';
import { ToastLayout } from './Utils/ToastMessages';
import AdminCollaborator from './Views/Admin/AdminCollaborator';
import AdminCombinations from './Views/Admin/AdminCombinations';
import AdminCompany from './Views/Admin/AdminCompany';
import AdminCompanyData from './Views/Admin/AdminCompanyData';
import AdminComplaint from './Views/Admin/AdminComplaint';
import AdminError from './Views/Admin/AdminError';
import AdminLogin from './Views/Admin/AdminLogin';
import CompanyCombinations from './Views/Company/CompanyCombinations';
import CompanyError from './Views/Company/CompanyError';
import CompanyIndicators from './Views/Company/CompanyIndicators';
import CompanyLogin from './Views/Company/CompanyLogin';
import CompanyMatch from './Views/Company/CompanyMatch';
import CompanyPasswordDefinition from './Views/Company/CompanyPasswordDefinition';
import CompanyProfile from './Views/Company/CompanyProfile';
import CompanyRecoverPassword from './Views/Company/CompanyRecoverPassword';
import CompanyRegister from './Views/Company/CompanyRegister';
import CompanyRegisterVacancy from './Views/Company/CompanyRegisterVacancy';
import CompanyTalentBank from './Views/Company/CompanyTalentBank';
import CompanyTalentSearch from './Views/Company/CompanyTalentSearch';
import CompanyVacancyData from './Views/Company/CompanyVacancyData';
import CompanyVacancyDetail from './Views/Company/CompanyVacancyDetail';
import Home from './Views/Home';
import Register from './Views/Register';
import UserApply from './Views/User/UserApply';
import UserCompanyDetail from './Views/User/UserCompanyDetail';
import UserCompanySearch from './Views/User/UserCompanySearch';
import UserEditData from './Views/User/UserEditData';
import UserError from './Views/User/UserError';
import UserProfile from './Views/User/UserProfle';
import UserVacancyDetail from './Views/User/UserVacancyDetail';
import UserVacancySearch from './Views/User/UserVacancySearch';

function App() {
    return (
        <div className="w-screen min-h-screen relative">
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/*" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/company" element={<CompanyRegister />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/company/login" element={<CompanyLogin />} />
                    <Route path="/company/recover-password" element={<CompanyRecoverPassword />} />
                    <Route path="/company/new-password" element={<CompanyPasswordDefinition />} />
                </Route>
                <Route element={<PrivateRoutes roles={[RoleEnum.Company]} />}>
                    <Route path="/company/*" element={<CompanyError />} />
                    <Route path="/company/" element={<CompanyIndicators />} />
                    <Route path="/company/indicators" element={<CompanyIndicators />} />
                    <Route path="/company/talents" element={<CompanyTalentBank />} />
                    <Route path="/company/talents/search" element={<CompanyTalentSearch />} />
                    <Route path="/company/vacancy/:id" element={<CompanyVacancyDetail />} />
                    <Route path="/company/vacancy/data/:id" element={<CompanyVacancyData />} />
                    <Route path="/company/combinations" element={<CompanyMatch />} />
                    <Route path="/company/combinations/:id" element={<CompanyCombinations />} />
                    <Route path="/company/register/vacancy" element={<CompanyRegisterVacancy />} />
                    <Route path="/company/profile" element={<CompanyProfile />} />
                </Route>
                <Route element={<PrivateRoutes roles={[RoleEnum.User]} />}>
                    <Route path="/user/*" element={<UserError />} />
                    <Route path="/user/" element={<UserProfile />} />
                    <Route path="/user/company/search" element={<UserCompanySearch />} />
                    <Route path="/user/company/detail/:id" element={<UserCompanyDetail />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/profile/edit" element={<UserEditData />} />
                    <Route path="/user/vacancy/search" element={<UserVacancySearch />} />
                    <Route path="/user/vacancy/detail/:id" element={<UserVacancyDetail />} />
                    <Route path="/user/applied" element={<UserApply />} />
                </Route>
                <Route element={<PrivateRoutes roles={[RoleEnum.Admin]} />}>
                    <Route path="/admin/*" element={<AdminError />} />
                    <Route path="/admin/" element={<AdminCompany />} />
                    <Route path="/admin/companies" element={<AdminCompany />} />
                    <Route path="/admin/collaborators" element={<AdminCollaborator />} />
                    <Route path="/admin/complaints" element={<AdminComplaint />} />
                    <Route path="/admin/combinations/:id" element={<AdminCombinations />} />
                    <Route path="/admin/company/:id" element={<AdminCompanyData />} />
                </Route>
            </Routes>
            <CookiesPopUp />
            <ToastLayout />
        </div>
    );
}

export default App;
