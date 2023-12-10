import { axios } from "@api/config/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => ({
      ...prev!,
      accessToken: response.data.accessToken,
    }));
    return response.data.accessToken as string;
  };
  return refresh;
};

export default useRefreshToken;
