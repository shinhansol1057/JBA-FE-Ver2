import axios, { AxiosInstance } from "axios";

export const Api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
