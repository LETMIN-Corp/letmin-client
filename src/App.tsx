import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
