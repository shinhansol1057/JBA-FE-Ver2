import { Api } from "@/services/axios/api";
import { getBearerToken } from "@/utils/getBearerToken";
import { api } from "@/services/axios/authApi";

export const FetchGetUserInfo = async () => {
  return api.get("/v1/api/account", {
    headers: {
      Authorization: await getBearerToken(),
    },
  });
};

export const FetchUpdateUserInfo = async (request: {
  name: string;
  phoneNum: string;
}) => {
  return Api.put("/v1/api/account", request, {
    headers: {
      Authorization: await getBearerToken(),
    },
  });
};

export const FetchUpdatePassword = async (request: {
  prevPW: string;
  newPW: string;
  newPWConfirm: string;
}) => {
  return Api.put("/v1/api/account/password", request, {
    headers: {
      Authorization: await getBearerToken(),
    },
  });
};
