import { NormalApi } from "@/services/axios/NormalApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { Api } from "@/services/axios/Api";
import { AddCompetitionRequestType } from "@/types/CompetitionType";

export const getCompetitionList = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number;
  queryKey: string[];
}) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/competition?status=${queryKey[1]}&page=${pageParam.toString()}&size=10`,
  );
  return res.json().catch((err) => {
    confirmAlert("warning", "오류 발생", "관리자에게 문의해주세요.").then(
      (res) => {
        if (res.isConfirmed) window.location.href = "/";
      },
    );
  });
};

export const getCompetitionDetail = (id: string) => {
  return NormalApi.get(`/v1/api/competition/detail/${id}`).catch((err) => {
    if (
      err.response.data.detailMessage ===
        "해당 아이디와 일치하는 대회를 찾을 수 없습니다." ||
      err.response.data.detailMessage === "대회 조회가 불가능합니다."
    )
      confirmAlert(
        "warning",
        "대회를 찾을 수 없습니다.",
        "관리자에게 문의해주세요.",
      ).then((res) => {
        if (res.isConfirmed) window.location.href = "/jeju-competition/info";
      });
  });
};

export const getCompetitionResult = (id: string) => {
  return NormalApi.get(`v1/api/competition/result/${id}`).catch((err) => {
    if (err.response.data.detailMessage === "대회를 찾을 수 없습니다.") {
      confirmAlert("error", "대회를 찾을 수 없습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = "/jeju-competition/info";
      });
    }
  });
};

export const getDivisionList = async () => {
  return NormalApi.get("/v1/api/competition/find-division-list");
};

export const addCompetitionInfo = async (
  requestData: AddCompetitionRequestType,
  files: File[],
) => {
  const blob: Blob = new Blob([JSON.stringify(requestData)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("requestData", blob);
  for (let i: number = 0; i < files.length; i++) {
    formData.append("requestFiles", files[i]);
  }

  return Api.post("/v1/api/competition/post/competition-info", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      confirmAlert("success", "대회등록이 완료되었습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = "/competition";
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data.detailMessage === "제목을 입력해주세요.")
        confirmAlert("warning", "제목을 입력해주세요.");
      else if (err.response.data.detailMessage === "종별을 선택해주세요.")
        confirmAlert("warning", "종별을 1개 이상 선택해주세요");
      else if (
        err.response.data.detailMessage === "시작일을 입력해주세요." ||
        err.response.data.detailMessage === "종료일을 입력해주세요."
      )
        confirmAlert("warning", "시작일 또는 종료일을 선택해주세요.");
      else if (err.response.data.detailMessage === "장소를 등록해주세요.")
        confirmAlert("warning", "장소를 등록해주세요.");
    });
};

export const deleteCompetitionInfo = async (id: string) => {
  console.log("delete competition");
};
