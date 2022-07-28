import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/Company/CompanyRegister'
import CompanyError from './Views/Company/CompanyError';
import CompanyIndicators from './Views/Company/CompanyIndicators';
import CompanyMatch from './Views/Company/CompanyMatch';
import CompanyTalentBank from './Views/Company/CompanyTalentBank';
import CompanyProfile from './Views/Company/CompanyProfile';
import CompanyCombinations from './Views/Company/CompanyCombinations';
import UserProfile from './Views/User/UserProfle';
import UserError from './Views/User/UserError';
import CompanyMatch from './Views/Company/CompanyMatch';

function App() {
  return (
    <div className='w-screen min-h-screen relative'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/register/company' element={ <CompanyRegister /> } />
<<<<<<< Updated upstream

        <Route path='/company/*' element={ <CompanyError /> } />
        <Route path='/company/indicators' element={ <CompanyIndicators /> } />
        <Route path='/company/talents' element={ <CompanyTalentBank /> } />
        <Route path='/company/profile' element={ <CompanyProfile /> } />
        <Route path='/company/combinations/:id' element={ <CompanyCombinations /> } />
        <Route path='/company/combinations' element={ <CompanyMatch />} />

        <Route path='/user/*' element={ <UserError /> } />
        <Route path='/user/profile' element={ <UserProfile /> } />
=======
        {
          userRole === RoleEnum.company && (
            <>
              <Route path='/company/*' element={ <CompanyError /> } />
              <Route path='/company/indicators' element={ <CompanyIndicators /> } />
              <Route path='/company/talents' element={ <CompanyTalentBank /> } />
              <Route path='/company/talent/search' element={ <CompanyTalentSearch /> } />
              <Route path='/company/profile' element={ <CompanyProfile /> } />
              <Route path='/company/combinations/:id' element={ <CompanyCombinations /> } />
              <Route path='/company/combinations' element={ <CompanyMatch/> }/>
            </>
          )
        }
        {
          userRole === RoleEnum.user && (
            <>
              <Route path='/user/*' element={ <UserError /> } />
              <Route path='/user/profile' element={ <UserProfile /> } />
              <Route path='/user/vacancy/search' element={ <UserVacancySearch /> } />
            </>
          )
        }
        {
          userRole === RoleEnum.admin && (
            <>
              <Route path='/admin/*' element={ <AdminError /> } />
              <Route path='/admin/login' element={ <AdminLogin /> } />
              <Route path='/admin/company' element={ <AdminCompany/> } />
              <Route path='/admin/collaborator' element={ <AdminCollaborator/> } />
              <Route path='/admin/complaint' element={ <AdminComplaint/> } />
            </>
          )
        }
>>>>>>> Stashed changes
      </Routes>
    </div>
  )
}

export default App
