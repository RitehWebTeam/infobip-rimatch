import Axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const axiosPublic = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers,
});
export const axiosPrivate = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers,
  withCredentials: true,
});
