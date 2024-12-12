// services/admin/competition.ts

import { authApi } from "@/services/axios/AuthApi"
import { CompetitionResponse, GetCompetitionsParams } from "./type"

export const getCompetitions = async (params: GetCompetitionsParams) => {
  try {
    const response = await authApi.get<CompetitionResponse>("/v1/api/admin/competition", { params })
    return response.data.data
  } catch (error) {
    console.error("Error fetching competitions:", error)
    return { content: [], totalElements: 0, totalPages: 0 }
  }
}
