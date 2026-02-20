import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./assets/components/footer/Footer";
import Navbar from "./assets/components/navbar/Navbar";
import ListaTemas from "./assets/components/tema/listatemas/ListaTemas";
import Cadastro from "./assets/pages/cadastro/Cadastro";
import Home from "./assets/pages/home/Home";
import Login from "./assets/pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/temas" element={<ListaTemas />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
