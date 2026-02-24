import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../contexts/AuthContext";
import type { Tema } from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";

function DeletarTema() {
  const navegate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);

  const [isLoading, setIsLoading] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        alert("Sua sessão expirou, faça login novamente.");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado.");
      navegate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Tema deletado com sucesso!");
      navegate("/temas");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        alert("Sua sessão expirou, faça login novamente.");
        handleLogout();
      } else {
        alert("Erro ao deletar tema, tente novamente.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navegate("/temas");
  }
  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja deletar este tema?
      </p>
      <div className="border flex flex-col rounderd-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>
        <div className="flex">
          <button
            onClick={retornar}
            className="cursor-pointer text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
          >
            Não
          </button>

          <button
            onClick={deletarTema}
            className=" cursor-pointer w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center py-2"
          >
            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
