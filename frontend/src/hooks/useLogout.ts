import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import AuthService from "@/api/auth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout } = AuthService.useLogout({
    onSuccess: () => {
      setAuth(null);
      navigate("/login");
    },
  });

  return logout;
};

export default useLogout;
