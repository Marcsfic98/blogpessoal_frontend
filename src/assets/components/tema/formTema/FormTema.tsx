import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ToastAlert } from "../../../../utils/ToastAlert";
import type { Tema } from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);

  const [isLoading, setIsLoading] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado para acessar essa página.");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      // Lógica para atualizar o tema existente
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });

        ToastAlert("Tema atualizado com sucesso!", "sucesso");
        retornar();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlert(
            "Erro ao atualizar o tema! Por favor, tente novamente.",
            "erro"
          );
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlert("Tema cadastrado com sucesso!", "successo");
        retornar();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlert(
            "Erro ao cadastrar o tema! Por favor, tente novamente.",
            "erro"
          );
        }
      }
    }
  }
  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Tema" : "Atualizar Tema"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema</label>
          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
        >
          {isLoading ? (
            <ClipLoader color="white" size={20} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
