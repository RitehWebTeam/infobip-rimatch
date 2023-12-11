import useAuth from "./useAuth";
import { refreshTokenRequest } from "@/api/auth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await refreshTokenRequest();

    setAuth((prev) => ({
      ...prev!,
      accessToken: response.token,
    }));
    return response.token;
  };
  return refresh;
};

export default useRefreshToken;
