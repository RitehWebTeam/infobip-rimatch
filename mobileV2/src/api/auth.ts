import type { User } from "../types/User";
import type {
  LoginData,
  RefreshTokenResponse,
  RegisterData,
  TokenResponse,
} from "../types/Auth";
import { axiosPublic } from "./config/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";
import * as SecureStore from "expo-secure-store";

const AuthService = {
  useLogin: (
    mutationOptions?: Omit<
      UseMutationOptions<RefreshTokenResponse, Error, LoginData>,
      "mutationFn" | "onSuccess"
    >
  ) => {
    const [, setRefreshToken] = useLocalStorage<string>("refreshToken", "");
    const { setAuth } = useAuth();
    return useMutation<RefreshTokenResponse, Error, LoginData>({
      mutationFn: async ({ email, password }) => {
        const trimmedEmail = email.trimEnd();
        const response = await axiosPublic.post<RefreshTokenResponse>(
          "/auth/login",
          { email: trimmedEmail, password },
          { withCredentials: true }
        );
        return response.data;
      },
      onSuccess: async ({ token, active, refreshToken }, { email }) => {
        setAuth({
          user: {
            email,
          },
          accessToken: token,
          active,
        });
        setRefreshToken(refreshToken);
      },
      ...mutationOptions,
    });
  },

  useRefreshToken: <T = TokenResponse>(
    mutationOptions?: Omit<UseMutationOptions<T>, "mutationFn">
  ) => {
    // When in StrictMode useLocalStorage sometimes returns the default value so this is a workaround
    const localStorageRefreshToken = SecureStore.getItem("refreshToken");
    const refreshToken = localStorageRefreshToken
      ? JSON.parse(localStorageRefreshToken)
      : "";
    return useMutation({
      mutationFn: async () => {
        try {
          const response = await axiosPublic.post<T>(
            "/auth/refresh",
            { refreshToken },
            { withCredentials: true }
          );
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
        await SecureStore.deleteItemAsync("accessToken");
        return response.data;
      },
      ...mutationOptions,
    });
  },
};

export default AuthService;
