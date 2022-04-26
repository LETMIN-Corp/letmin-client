import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";

function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
