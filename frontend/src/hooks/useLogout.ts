import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { logoutRequest } from "@/api/auth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    setAuth(null);
    logoutRequest();
    navigate("/login");
  };

  return logout;
};

export default useLogout;
