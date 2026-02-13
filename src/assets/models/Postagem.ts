import type { Tema } from "./Tema";
import type { Usuario } from "./Usuario";


export interface Postagem{
  id:number
  title:string
  texto:string
  data:string
  tema: Tema | null
  Usuario: Usuario | null
}