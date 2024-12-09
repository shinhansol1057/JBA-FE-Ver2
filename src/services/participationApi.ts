import { Api } from "@/services/axios/Api";
import { getBearerToken } from "@/utils/getBearerToken";

const FetchGetMyParticipationList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  if (pageParam === 0) {
    return Api.get(`/v1/api/competition/participate/my`, {
      headers: {
        Authorization: await getBearerToken(),
      },
    });
  } else {
    return Api.get(
      `/v1/api/competition/participate/my?cursor=${queryKey[1]}&idCursor=${pageParam}`,
      {
        headers: {
          Authorization: await getBearerToken(),
        },
      },
    );
  }
};

const FetchGetParticipation = async (id: string) => {
  return Api.get(`/v1/api/competition/participate/${id}`, {
    headers: {
      Authorization: await getBearerToken(),
    },
  });
};

export { FetchGetMyParticipationList, FetchGetParticipation };
