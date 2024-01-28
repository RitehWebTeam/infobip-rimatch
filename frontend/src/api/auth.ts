import type { User } from "@/types/User";
import type { LoginData, RegisterData, TokenResponse } from "@/types/Auth";
import { axiosPublic } from "./config/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
        try {
          const response = await axiosPublic.get<T>("/auth/refresh", {
            withCredentials: true,
          });
          return response.data;
        } catch (e) {
          const error = e as AxiosError<Record<string, string>>;
          const message = `Status: ${error.response?.status}, Error: ${error.response?.data?.error}, Message: ${error.response?.data?.message}`;
          throw new Error(message);
        }
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
