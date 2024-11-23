import axios from "axios"
import { auth } from "../../../auth"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: { "Content-Type": "application/json" }
})

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    "Content-Type": "application/json"
  }
})

authApi.interceptors.request.use(async (config) => {
  const session = await auth()

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`
  }

  return config
})
