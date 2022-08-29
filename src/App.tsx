import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/Company/CompanyRegister'
import CompanyError from './Views/Company/CompanyError';
import CompanyIndicators from './Views/Company/CompanyIndicators';
import CompanyMatch from './Views/Company/CompanyMatch';
import CompanyTalentBank from './Views/Company/CompanyTalentBank';
import CompanyTalentSearch from './Views/Company/CompanyTalentSearch';
import CompanyRegisterVacancy from './Views/Company/CompanyRegisterVacancy';
import CompanyProfile from './Views/Company/CompanyProfile';
import CompanyCombinations from './Views/Company/CompanyCombinations';
import UserProfile from './Views/User/UserProfle';
import UserError from './Views/User/UserError';
import UserVacancySearch from './Views/User/UserVacancySearch';
import AdminLogin from './Views/Admin/AdminLogin';
import AdminCompany from './Views/Admin/AdminCompany';
import AdminError from './Views/Admin/AdminError';
import AdminCollaborator from './Views/Admin/AdminCollaborator';
import AdminComplaint from './Views/Admin/AdminComplaint';
import { AuthContext, AuthState } from "./Context/AuthContextProvider";
import RoleEnum from './Utils/RoleEnum';

import PrivateRoutes from './Utils/PrivateRoutes';
import CompanyLogin from './Views/Company/CompanyLogin';

function App() {
  return (
    <div className='w-screen min-h-screen relative'>
      <Routes>
        {/* <Route path='*' element={ <Home /> } /> */}
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/register/company' element={ <CompanyRegister /> } />
        <Route path='/company/login' element={ <CompanyLogin /> } />
        <Route path='/admin/login' element={ <AdminLogin /> } />

        <Route element={ <PrivateRoutes role={RoleEnum.company} /> }>
              <Route path='/company/*' element={ <CompanyError /> } />
              <Route path='/company/indicators' element={ <CompanyIndicators /> } />
              <Route path='/company/talents' element={ <CompanyTalentBank /> } />
              <Route path='/company/talents/search' element={ <CompanyTalentSearch /> } />
              <Route path='/company/combinations' element={ <CompanyMatch />} />
              <Route path='/company/combinations/:id' element={ <CompanyCombinations /> } />
              <Route path='/company/register/vacancy' element={ <CompanyRegisterVacancy /> } />
              <Route path='/company/profile' element={ <CompanyProfile /> } />
        </Route>
        <Route element={ <PrivateRoutes role={RoleEnum.user} /> }>
              <Route path='/user/*' element={ <UserError /> } />
              <Route path='/user/profile' element={ <UserProfile /> } />
              <Route path='/user/vacancy/search' element={ <UserVacancySearch /> } />
        </Route>
        <Route element={ <PrivateRoutes role={RoleEnum.admin} /> }>
              <Route path='/admin/*' element={ <AdminError /> } />
              <Route path='/admin/companies' element={ <AdminCompany/> } />
              <Route path='/admin/collaborators' element={ <AdminCollaborator/> } />
              <Route path='/admin/complaints' element={ <AdminComplaint/> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
