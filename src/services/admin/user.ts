import { getBearerToken } from "@/utils/getBearerToken";
import { Api } from "../axios/api";

export interface GetUsersParams {
  page?: number;
  size?: number;
  keyword?: string;
  searchCriteriaString?: string;
  permissionsStr?: string;
  startDate?: string;
  endDate?: string;
}

export const getUsers = async (params: GetUsersParams) => {
  try {
    const token = await getBearerToken();
    const response = await Api.get("/v1/api/admin/user", {
      params,
      headers: {
        Authorization: await getBearerToken(),
      },
    });
    return response.data.data.content;
  } catch (error) {
    // console.error("Error fetching users:", error)
    return null;
  }
};
