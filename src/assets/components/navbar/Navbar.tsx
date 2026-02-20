import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O usuario Foi desconectado");
    navigate("/");
  }
  return (
    <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
      <div className="container flex justify-between text-lg mx-8">
        <Link to={"/home"} className="text-2xl font-bold">
          Blog Pessoal
        </Link>

        <ul className="flex gap-8">
          <li>
            <a href="#">Postagens</a>
          </li>
          <li>
            <Link to="/temas" className="hover:underline">
              Temas
            </Link>
          </li>
          <li>
            <a href="#">Cadastrar Tema</a>
          </li>
          <li>
            <Link to={"/login"} className="hover:underline">
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

export default Navbar;
