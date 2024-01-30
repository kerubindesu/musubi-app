import { Routes, Route, useNavigate } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    navigate("/dash")
  }
  return (
      <Routes>
        <Route path="/" element={<div onClick={handleClick}>Hello World</div>} />
        <Route path="/*" element={ <AppRoutes /> } />
        <Route path="/auth/*" element={<AuthRoutes /> } />)
      </Routes>
  );
}

export default App;
