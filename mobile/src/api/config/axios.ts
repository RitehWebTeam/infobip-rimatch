import Axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

// @ts-expect-error This is necessary because the baseURL is defined outside of this file.
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
