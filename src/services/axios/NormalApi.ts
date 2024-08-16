import axios, { AxiosInstance } from "axios";

export const NormalApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY, // 배포된 서버 사용시
  // baseURL: "http://localhost:8080", // 로컬 서버 사용시
  header: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
