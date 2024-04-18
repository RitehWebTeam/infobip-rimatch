import Axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseURL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`;

export const axiosPublic = Axios.create({
  baseURL,
  headers,
});
export const axiosPrivate = Axios.create({
  baseURL,
  headers,
  withCredentials: true,
});
