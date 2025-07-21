import {
  CompetitionResponse,
  GetCompetitionsParams,
} from "@/app/admin/competition/type";
import { authApi } from "@/services/axios/authApi";

const getParticipates = async (params: GetCompetitionsParams) => {
  try {
    const response = await authApi.get<CompetitionResponse>(
      "/v1/api/admin/competition",
      { params },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching competitions:", error);
    return { content: [], totalElements: 0, totalPages: 0 };
  }
};

export { getParticipates };
