import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";

function App() {
  return (
      <Routes>
        <Route path="/*" element={ <AppRoutes /> } />
        <Route path="/auth/*" element={<AuthRoutes /> } />)
      </Routes>
  );
}

export default App;
