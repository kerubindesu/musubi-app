import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/organism";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<PublicRoute />} />
        <Route path="login" element={<Login />} />
        
      </Route>
    </Routes>
  );
}

export default App;
