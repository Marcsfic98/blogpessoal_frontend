import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./assets/components/footer/Footer";
import Navbar from "./assets/components/navbar/Navbar";
import DeletarPostagem from "./assets/components/postagem/deletarpostagem/DeletarPostagem";
import FormPostagem from "./assets/components/postagem/formpostagem/FormPostagem";
import ListaPostagens from "./assets/components/postagem/listapostagem/ListaPostagem";
import DeletarTema from "./assets/components/tema/deletartema/DeletarTema";
import FormTema from "./assets/components/tema/formTema/FormTema";
import ListaTemas from "./assets/components/tema/listatemas/ListaTemas";
import Cadastro from "./assets/pages/cadastro/Cadastro";
import Home from "./assets/pages/home/Home";
import Login from "./assets/pages/login/Login";
import Perfil from "./assets/pages/perfil/Perfil";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        {/* Adicionamos um container principal com flex e altura mínima da tela */}
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* O flex-1 faz este elemento crescer e ocupar todo o espaço disponível */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastrartema" element={<FormTema />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastrarpostagem" element={<FormPostagem />} />
              <Route path="/editarpostagem/:id" element={<FormPostagem />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route
                path="/deletarpostagem/:id"
                element={<DeletarPostagem />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
