import { authApi } from "@/services/axios/AuthApi"
import { GetUsersParams, UserResponse } from "./type"

export const getUsers = async (params: GetUsersParams) => {
  try {
    const response = await authApi.get<UserResponse>("/v1/api/admin/user", { params })
    return response.data.data.content
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}
