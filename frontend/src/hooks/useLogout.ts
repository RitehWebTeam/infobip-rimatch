import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import AuthService from "@/api/auth";
import useLocalStorage from "./useLocalStorage";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");
  const { mutate: logout } = AuthService.useLogout({
    onSuccess: () => {
      setAuth(null);
      setRefreshToken("");
      navigate("/login");
    },
  });

  return logout;
};

export default useLogout;
