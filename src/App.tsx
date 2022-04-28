import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import CompanyRegister from './views/CompanyRegister'
function App() {
  return (
    <div className="w-screen min-h-screen relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/company" element={<CompanyRegister />} />
      </Routes>
    </div>
  )
}

export default App
