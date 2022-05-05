import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import CompanyRegister from './Views/CompanyRegister'

function App() {
  return (
    <div className='w-screen min-h-screen relative'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/company' element={<CompanyRegister />} />
      </Routes>
    </div>
  )
}

export default App
