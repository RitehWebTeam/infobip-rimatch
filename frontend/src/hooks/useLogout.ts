import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage<string>("token", "");
  const logout = async () => {
    setAuth(null);
    setToken("");
    navigate("/login");
  };

  return logout;
};

export default useLogout;
