import { NormalApi } from "@/services/axios/NormalApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";

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
