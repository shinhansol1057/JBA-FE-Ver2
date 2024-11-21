import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {'Content-Type': 'application/json'}
})

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    'Content-Type': 'application/json'
  }
});

authApi.interceptors.request.use(async (config) => {
  const session = await getServerSession(nextAuthOptions);
  
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  
  return config;
});