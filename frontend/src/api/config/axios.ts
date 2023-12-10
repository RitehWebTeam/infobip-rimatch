import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const axiosPrivate = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
