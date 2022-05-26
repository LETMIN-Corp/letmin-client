import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/Company/CompanyRegister'
import CompanyPage from './Views/Company/CompanyPage';
import CompanyIndicators from './Views/Company/CompanyIndicators';

function App() {
  return (
    <div className='w-screen min-h-screen relative'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/register/company' element={ <CompanyRegister /> } />
        <Route path='/company/*' element={ <CompanyPage /> } />
        <Route path='/company/indicators' element={ <CompanyIndicators /> } />
      </Routes>
    </div>
  )
}

export default App
