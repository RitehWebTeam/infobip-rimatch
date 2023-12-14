import { axiosPublic } from "./config/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { User } from "./users";

interface TokenResponse {
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}

interface LoginData {
  email: string;
  password: string;
}

const AuthService = {
  useLogin: <T = TokenResponse>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, LoginData>,
      "mutationFn"
    >
  ) => {
    return useMutation<T, Error, LoginData>({
      mutationFn: async ({ email, password }) => {
        const response = await axiosPublic.post<T>(
          "/auth/login",
          { email, password },
          { withCredentials: true }
        );
        return response.data;
      },
      ...mutationOptions,
    });
  },

  useRefreshToken: <T = TokenResponse>(
    mutationOptions?: Omit<UseMutationOptions<T>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosPublic.get<T>("/auth/refresh", {
          withCredentials: true,
        });
        return response.data;
      },
      ...mutationOptions,
    });
  },

  useRegister: <T = User>(
    mutationOptions?: Omit<
      UseMutationOptions<T, Error, RegisterData>,
      "mutationFn"
    >
  ) => {
    return useMutation({
      mutationFn: async (registerData) => {
        const response = await axiosPublic.post<T>(
          "/auth/signup",
          registerData
        );
        return response.data;
      },
      ...mutationOptions,
    });
  },

  useLogout: <T = void>(
    mutationOptions?: Omit<UseMutationOptions<T>, "mutationFn">
  ) => {
    return useMutation({
      mutationFn: async () => {
        const response = await axiosPublic.get<T>("/auth/logout", {
          withCredentials: true,
        });
        return response.data;
      },
      ...mutationOptions,
    });
  },
};

export default AuthService;
