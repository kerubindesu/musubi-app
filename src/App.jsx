import { Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/*" element={ <AppRoutes /> } />
        <Route path="/auth/*" element={<AuthRoutes /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
