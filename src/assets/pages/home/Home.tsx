import ListaPostagens from "../../components/postagem/listapostagem/ListaPostagem";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="bg-indigo-900 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p style={{ fontSize: "1.5rem" }}>
              Expresse aqui seus pensamentos e opiniões..
            </p>
            <div className="flex justify-around gap-4">
              <ModalPostagem />
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="imagem da pagina home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;
