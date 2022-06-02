import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/Company/CompanyRegister'
import CompanyError from './Views/Company/CompanyError';
import CompanyIndicators from './Views/Company/CompanyIndicators';
import CompanyTalentBank from './Views/Company/CompanyTalentBank';
import CompanyProfile from './Views/Company/CompanyProfile';
import CompanyCombinations from './Views/Company/CompanyCombinations';

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
      </Routes>
    </div>
  )
}

export default App
