import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/components/Login";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
