import { axiosPublic } from "@api/config/axios";
// import useAuth from "./useAuth";

const useRefreshToken = () => {
  // const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.post("/auth/refresh", {
      withCredentials: true,
    });

    // TODO
    // setAuth((prev) => ({
    //   ...prev!,
    //   accessToken: response.data.accessToken,
    // }));
    return response.data.accessToken as string;
  };
  return refresh;
};

export default useRefreshToken;
