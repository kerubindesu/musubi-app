import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<AppRoutes />} />
    </Routes>
  );
}

export default App;
