import { Api } from "@/services/axios/api";
import { getBearerToken, getServerBearerToken } from "@/utils/getBearerToken";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { QueryClient } from "@tanstack/react-query";
import { CompetitionDetailAttachedFileType } from "@/types/competitionType";

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
  const url =
    process.env.NEXT_PUBLIC_API_KEY + `/v1/api/competition/participate/${id}`;
  const res = await fetch(url, {
    headers: {
      Authorization: await getServerBearerToken(),
    },
    cache: "no-store",
  });
  return res.json();
};

const FetchPostParticipation = async (
  divisionId: string | null,
  name: string,
  phoneNum: string,
  email: string,
  files: File[],
  router: AppRouterInstance,
  id: string,
) => {
  if (!divisionId) {
    await confirmAlert("warning", "종별을 선택해주세요.");
    return;
  }
  const requestBody = { name, email, phoneNum };
  const blob: Blob = new Blob([JSON.stringify(requestBody)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  files.forEach((file) => {
    formData.append("files", file);
  });
  return Api.post(`/v1/api/competition/participate/${divisionId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      router.push(`/competition-participation-complete/${res.data.data}`);
      confirmAlert("success", "참가 신청 성공!");
    })
    .catch((err) => {
      const message: string = err.response.data.detailMessage;
      if (message === "이름은 필수입니다.")
        confirmAlert("warning", "이름을 입력해주세요.");
      else if (
        message === "전화번호는 필수입니다." ||
        message === "휴대폰번호 유효성 검사 실패"
      )
        confirmAlert("warning", "휴대폰 번호를 정확히 입력해주세요.");
      else if (
        message === "이메일은 필수입니다." ||
        message === "이메일 형식이 아닙니다."
      )
        confirmAlert("warning", "이메일을 정확히 입력해주세요.");
      else if (message === "divisionId가 잘못되었습니다.")
        confirmAlert("warning", "종별 선택이 잘못되었습니다.").then((res) => {
          if (res.isConfirmed) router.refresh();
        });
      else
        confirmAlert("error", "오류 발생!", "다시 시도해주세요").then((res) => {
          if (res.isConfirmed) router.push(`/jeju-competition/info/${id}`);
        });
    });
};

const FetchDeleteParticipation = async (
  id: number,
  router: AppRouterInstance,
  queryClient: QueryClient,
) => {
  return Api.delete(`/v1/api/competition/participate/${id}`, {
    headers: {
      Authorization: await getBearerToken(),
    },
  }).then((res) => {
    confirmAlert("success", "신청이 취소되었습니다.").then(() => {
      queryClient.invalidateQueries({
        queryKey: ["getMyCompetitionParticipationList"],
      });
      router.push("/user/my-participation");
    });
  });
};

const FetchUpdateParticipation = async (request: {
  divisionId: string | null;
  name: string;
  phoneNum: string;
  email: string;
  files: File[];
  router: AppRouterInstance;
  id: string;
  remainingFiles: { fileName: string; fileUrl: string }[];
}) => {
  if (!request.divisionId) {
    await confirmAlert("warning", "종별을 선택해주세요.");
    return;
  }
  const requestBody = {
    divisionId: request.divisionId,
    name: request.name,
    email: request.email,
    phoneNum: request.phoneNum,
    remainingFiles: request.remainingFiles,
  };

  const blob: Blob = new Blob([JSON.stringify(requestBody)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("body", blob);
  request.files.forEach((file) => {
    formData.append("files", file);
  });
  return Api.put(`/v1/api/competition/participate/${request.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: await getBearerToken(),
    },
  });
};

export {
  FetchGetMyParticipationList,
  FetchGetParticipation,
  FetchPostParticipation,
  FetchDeleteParticipation,
  FetchUpdateParticipation,
};
