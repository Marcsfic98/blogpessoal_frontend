import { createContext, useState, type ReactNode } from "react";
import type { UsuarioLogin } from "../assets/models/UsuarioLogin";
import { login } from "../assets/services/Service";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    Usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
      alert("O usuario foi altenticado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("os dados do usuario são inconcistentes");
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      Usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
