import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ToastAlert } from "../../../../utils/ToastAlert";
import type { Postagem } from "../../../models/Postagem";
import type { Tema } from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlert("Sua sessão expirou, faça login novamente.", "erro");
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlert("Sua sessão expirou, faça login novamente.", "erro");
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar(`/temas/`, setTemas, {
        headers: {
          Authorization: token,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes("401")) {
        ToastAlert("Sua sessão expirou, faça login novamente.", "erro");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlert("Você precisa estar logado.", "erro");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens/${id}`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlert("Postagem atualizada com sucesso!", "successo");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("401")) {
          ToastAlert("Sua sessão expirou, faça login novamente.", "erro");
          handleLogout();
        } else {
          ToastAlert("Erro ao atualizar postagem. Tente novamente.", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlert("Postagem cadastrada com sucesso!", "successo");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("401")) {
          ToastAlert("Sua sessão expirou, faça login novamente.", "erro");
          handleLogout();
        } else {
          ToastAlert("Erro ao cadastrar postagem. Tente novamente.", "erro");
        }
      }

      setIsLoading(false);
      retornar();
    }
  }

  const carregandoTema = tema.descricao === "";
  return (
    <div className="container flex flex-col mx-auto items-center ">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>
      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
            className="border-2 border-slate-800 rounded p-2"
          >
            <option selected disabled value="">
              Selecione um tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>
                {tema.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="w-1/2 text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2 mx-auto rounded cursor-pointer my-2"
            disabled={carregandoTema}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={24} />
            ) : (
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPostagem;
