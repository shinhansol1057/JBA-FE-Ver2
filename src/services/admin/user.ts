import { NormalApi } from "@/services/axios/NormalApi"
import { getBearerToken } from "@/utils/getBearerToken"
import { Api } from "../axios/Api"

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
    const token = await getBearerToken()
    console.log(token)
    const response = await Api.get("/v1/api/admin/user", {
      params,
      headers: {
        Authorization: await getBearerToken()
      }
    })
    return response.data.data.content
  } catch (error) {
    // console.error("Error fetching users:", error)
    return null
  }
}
