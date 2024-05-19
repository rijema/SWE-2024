import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Banner from './components/Banner';
import CreateClient from "./pages/CreateClient";
import UserSerach from "./pages/UserSearch";
import Login_Cliente from "./pages/Login_Cliente.jsx";
import Login_Empresa from "./pages/Login_Empresa.jsx";
import CreateCompany from "./pages/CreateCompany.js";

function App() {
  return (
    <div>
      {/* deixando a página cadastrar cliente como padrão inicialmente */}
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateClient />} />
        </Routes>
        <Routes>
          <Route exact path="/create_company" element={<CreateCompany />} />
        </Routes>
        <Routes>
          <Route exact path="/search" element={<UserSerach />} />
        </Routes>
        <Routes>
          <Route exact path="/login_client" element={<Login_Cliente/>} />
        </Routes>
        <Routes>
          <Route exact path="/login_empresa" element={<Login_Empresa /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
