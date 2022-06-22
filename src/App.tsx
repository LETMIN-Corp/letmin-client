import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/Company/CompanyRegister'
import CompanyError from './Views/Company/CompanyError';
import CompanyIndicators from './Views/Company/CompanyIndicators';
import CompanyTalentBank from './Views/Company/CompanyTalentBank';
import CompanyProfile from './Views/Company/CompanyProfile';
import CompanyCombinations from './Views/Company/CompanyCombinations';
import UserProfile from './Views/User/UserProfle';
import UserError from './Views/User/UserError';
import AdminLogin from './Views/Admin/AdminLogin';
import AdminCompany from './Views/Admin/AdminCompany';
import AdminError from './Views/Admin/AdminError';

function App() {
  return (
    <div className='w-screen min-h-screen relative'>
      <Routes>
        <Route path='/' element={ <Home /> } />

        <Route path='/register' element={ <Register /> } />
        <Route path='/register/company' element={ <CompanyRegister /> } />

        <Route path='/company/*' element={ <CompanyError /> } />
        <Route path='/company/indicators' element={ <CompanyIndicators /> } />
        <Route path='/company/talents' element={ <CompanyTalentBank /> } />
        <Route path='/company/profile' element={ <CompanyProfile /> } />
        <Route path='/company/combinations/:id' element={ <CompanyCombinations /> } />

        <Route path='/user/*' element={ <UserError /> } />
        <Route path='/user/profile' element={ <UserProfile /> } />

        <Route path='/admin/*' element={ <AdminError /> } />
        <Route path='/admin/login' element={ <AdminLogin /> } />
        <Route path='/admin/company' element={ <AdminCompany/> } />
      </Routes>
    </div>
  )
}

export default App
