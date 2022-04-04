import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";

function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
