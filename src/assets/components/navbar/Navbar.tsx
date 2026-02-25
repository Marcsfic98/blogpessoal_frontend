import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlert } from "../../../utils/ToastAlert";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlert("O Usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to={"/home"} className="text-2xl font-bold">
            Blog Pessoal
          </Link>

          <ul className="flex gap-8">
            <li>
              <Link to="/postagens" className="hover:underline">
                Postagens
              </Link>
            </li>
            <li>
              <Link to="/temas" className="hover:underline">
                Temas
              </Link>
            </li>
            <li>
              <Link to="/cadastrartema" className="hover:underline">
                Cadastrar Tema
              </Link>
            </li>
            <li>
              <Link to={"/perfil"} className="hover:underline">
                Perfil
              </Link>
            </li>
            <li>
              <Link to="" onClick={logout} className="hover:underline">
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default Navbar;
