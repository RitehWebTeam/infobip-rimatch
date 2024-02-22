import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import AuthService from "@/api/auth";
import useLocalStorage from "./useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");
  const { mutate: logout } = AuthService.useLogout({
    onSuccess: () => {
      setAuth(null);
      setRefreshToken("");
      navigate("/login");
      queryClient.clear();
    },
  });

  return logout;
};

export default useLogout;
