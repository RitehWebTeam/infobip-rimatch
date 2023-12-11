import axios from "axios";
import { axiosPublic } from "./config/axios";

interface TokenResponse {
  token: string;
}

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosPublic.post<TokenResponse>(
    "/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return response.data;
};

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}

export const registerRequest = async (registerData: RegisterData) => {
  const response = await axiosPublic.post("/auth/signup", registerData);

  if (response.status !== axios.HttpStatusCode.Ok) {
    throw new Error(response.data);
  }

  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await axiosPublic.get<TokenResponse>("/auth/refresh", {
    withCredentials: true,
  });
  return response.data;
};

export const logoutRequest = async () => {
  return axiosPublic.get<{ message: string }>("/auth/logout", {
    withCredentials: true,
  });
};
