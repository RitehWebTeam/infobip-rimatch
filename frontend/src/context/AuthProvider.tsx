import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useState } from "react";

interface StateContextType<T> {
  auth: T;
  setAuth: React.Dispatch<React.SetStateAction<T>> | ((auth: T) => void);
}

interface AuthObject {
  user: Record<string, unknown>;
  accessToken: string;
}

type AuthContextType = StateContextType<AuthObject | null>;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useLocalStorage<string>("token", "");

  const [auth, _setAuth] = useState<AuthObject | null>(() => {
    return token ? ({ accessToken: token } as AuthObject) : null;
  });

  const setAuth = (auth: AuthObject | null) => {
    if (auth) {
      setToken(auth.accessToken);
    }
    _setAuth(auth);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
