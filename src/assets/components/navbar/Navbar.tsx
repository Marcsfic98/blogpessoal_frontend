import { Link } from "react-router-dom";

function Navbar() {
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
            <a href="#">Temas</a>
          </li>
          <li>
            <a href="#">Cadastrar Tema</a>
          </li>
          <li>
            <Link to={"/login"}>Perfil</Link>
          </li>
          <li>
            <a href="#">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
