import axios from "axios";

const api = axios.create({
  baseURL:"https://personal-blog-zkpf.onrender.com/"
})


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastrarUsuario = async (url:string , dados:object , setDados:Function ) => {
  const resposta = await api.post(url,dados)
  setDados(resposta.data)
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-wrapper-object-types
export const login = async (url:string , dados:Object , setDados:Function ) => {
  const resposta = await api.post(url,dados)
  setDados(resposta.data)
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const buscar =  async(url: string , setDados:Function , header:object) => {
  const resposta =  await api.get(url,header)
  setDados(resposta.data)
}
