import { createContext, useState } from "react";

interface StateContextType<T> {
  auth: T;
  setAuth: React.Dispatch<React.SetStateAction<T>>;
}

interface AuthObject {
  user: Record<string, unknown>;
  accessToken: string;
  active: boolean;
}

type AuthContextType = StateContextType<AuthObject | null>;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [auth, setAuth] = useState<AuthObject | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
