import axios from "axios";
import { axiosPublic } from "./config/axios";

interface LoginResponse {
  token: string;
}

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosPublic.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
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
