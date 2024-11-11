import { NormalApi } from "@/services/axios/NormalApi"

export interface GetUsersParams {
  page?: number
  size?: number
  keyword?: string
  searchCriteriaString?: string
  permissionsStr?: string
  startDate?: string
  endDate?: string
}

export const getUsers = async (params: GetUsersParams) => {
  try {
    const response = await NormalApi.get("/v1/api/admin/user", { params })
    return response.data.data.content
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}
