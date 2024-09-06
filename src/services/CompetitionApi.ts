import { NormalApi } from "@/services/axios/NormalApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { Api } from "@/services/axios/Api";
import {
  addCompetitionRequestType,
  addCompetitionResultType,
  addCompetitionScheduleType,
  updateCompetitionRequestType,
} from "@/types/CompetitionType";
import { getSession } from "next-auth/react";

export const FetchGetCompetitionList = async ({
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

export const FetchGetCompetitionDetail = (id: string) => {
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

export const FetchGetCompetitionResult = (id: string) => {
  return NormalApi.get(`v1/api/competition/result/${id}`).catch((err) => {
    if (err.response.data.detailMessage === "대회를 찾을 수 없습니다.") {
      confirmAlert("error", "대회를 찾을 수 없습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = "/jeju-competition/info";
      });
    }
  });
};

export const FetchGetDivisionList = async () => {
  return NormalApi.get("/v1/api/competition/find-division-list");
};

export const FetchAddCompetitionInfo = async (
  requestData: addCompetitionRequestType,
  files: File[],
) => {
  const session = await getSession();
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
      Authorization: session?.accessToken,
    },
  })
    .then((res) => {
      confirmAlert("success", "대회등록이 완료되었습니다.").then((res) => {
        if (res.isConfirmed) window.location.href = "/jeju-competition/info";
      });
    })
    .catch((err) => {
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

export const FetchDeleteCompetitionInfo = async (id: string) => {
  const session = await getSession();
  return Api.delete(`/v1/api/competition/delete/${id}`, {
    headers: {
      Authorization: session?.accessToken,
    },
  })
    .then((res) => {
      if (res.data.code === 200) {
        confirmAlert("success", "대회가 삭제되었습니다.").then((res) => {
          window.location.href = `/jeju-competition/info`;
        });
      }
    })
    .catch((err) => {
      confirmAlert(
        "error",
        "대회 삭제 중 오류가 발생했습니다.",
        "관리자에게 문의해주세요.",
      );
    });
};

export const FetchUpdateCompetitionInfo = async (
  id: string,
  requestData: updateCompetitionRequestType,
  files: File[],
) => {
  const session = await getSession();
  const blob: Blob = new Blob([JSON.stringify(requestData)], {
    type: "application/json",
  });
  const formData: FormData = new FormData();
  formData.append("requestData", blob);
  for (let i: number = 0; i < files.length; i++) {
    formData.append("requestFiles", files[i]);
  }

  return Api.post(
    `/v1/api/competition/update/competition-info/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: session?.accessToken,
      },
    },
  )
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "대회수정이 완료되었습니다.").then((res) => {
          if (res.isConfirmed)
            window.location.href = `/jeju-competition/info/${id}`;
        });
      }
    })
    .catch((err) => {
      const message = err.response.data.detailMessage;
      if (message === "제목을 입력해주세요.")
        confirmAlert("error", "제목을 입력해주세요.");
      else if (message === "종별을 선택해주세요.")
        confirmAlert("error", "종별을 1개 이상 선택해주세요");
      else if (
        message === "시작일을 입력해주세요." ||
        message === "종료일을 입력해주세요."
      )
        confirmAlert("error", "시작일 또는 종료일을 선택해주세요.");
      else if (message === "장소를 등록해주세요.")
        confirmAlert("error", "장소를 등록해주세요.");
      else if (
        message === "해당 종별은 결과가 이미 입력되어 있어 삭제가 불가능합니다."
      )
        confirmAlert(
          "error",
          message + "은(는) 이미 결과가 있어 삭제가 불가능합니다.",
          "대회 결과를 먼저 수정해주세요.",
        );
      else if (message === "Duplication CompetitionName")
        confirmAlert(
          "error",
          "이미 등록된 대회명입니다.",
          "다른 대회명을 입력해주세요.",
        );
    });
};

export const FetchAddSchedule = async (
  id: string,
  postCompetitionScheduleList: addCompetitionScheduleType[],
) => {
  const request: { request: addCompetitionScheduleType[] } = {
    request: postCompetitionScheduleList,
  };
  const session = await getSession();
  return Api.post(`/v1/api/competition/post/schedule/${id}`, request, {
    headers: {
      Authorization: session?.accessToken,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "대회일정등록이 완료되었습니다.").then(
          (res) => {
            if (res.isConfirmed)
              window.location.href = `/jeju-competition/info/${id}`;
          },
        );
      }
    })
    .catch((err) => {
      const errMessage: string = err.response.data.detailMessage;
      if (errMessage === "스테이지를 입력해주세요.")
        confirmAlert("warning", "floor를 입력해주세요.");
      else if (errMessage === "종별을 입력해주세요.")
        confirmAlert("warning", "종별을 입력해주세요.");
      else if (errMessage === "HOME 팀명을 입력해주세요.")
        confirmAlert("warning", "HOME 팀명을 입력해주세요.");
      else if (errMessage === "AWAY 팀명을 입력해주세요.")
        confirmAlert("warning", "AWAY 팀명을 입력해주세요.");
      else if (errMessage === "시작일을 입력해주세요.")
        confirmAlert("warning", "시작일을 입력해주세요.");
      else if (errMessage === "경기 번호가 없습니다.")
        confirmAlert("warning", "경기 번호가 없습니다.");
      else if (errMessage === "장소를 입력해주세요.")
        confirmAlert("warning", "장소를 입력해주세요.");
      else if (errMessage === "5대5 경기여부를 입력해주세요.")
        confirmAlert("warning", "5대5 경기여부를 입력해주세요.");
      else if (errMessage === "대회를 찾을 수 없습니다.")
        confirmAlert("warning", "대회를 찾을 수 없습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = "/jeju-competition/info";
        });
      else if (errMessage === "이미 일정이 등록된 대회입니다.")
        confirmAlert("warning", "이미 일정이 등록된 대회입니다.").then(
          (res) => {
            if (res.isConfirmed)
              window.location.href = `/jeju-competition/info/${id}`;
          },
        );
    });
};

export const FetchUpdateSchedule = async (
  id: string,
  postCompetitionScheduleList: addCompetitionScheduleType[],
) => {
  const request: { request: addCompetitionScheduleType[] } = {
    request: postCompetitionScheduleList,
  };
  const session = await getSession();
  return Api.put(`/v1/api/competition/update/schedule/${id}`, request, {
    headers: {
      Authorization: session?.accessToken,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "대회일정수정이 완료되었습니다.").then(
          (res) => {
            if (res.isConfirmed)
              window.location.href = `/jeju-competition/info/${id}`;
          },
        );
      }
    })
    .catch((err) => {
      const errMessage: string = err.response.data.detailMessage;
      if (errMessage === "스테이지를 입력해주세요.")
        confirmAlert("warning", "floor를 입력해주세요.");
      else if (errMessage === "종별을 입력해주세요.")
        confirmAlert("warning", "종별을 입력해주세요.");
      else if (errMessage === "HOME 팀명을 입력해주세요.")
        confirmAlert("warning", "HOME 팀명을 입력해주세요.");
      else if (errMessage === "AWAY 팀명을 입력해주세요.")
        confirmAlert("warning", "AWAY 팀명을 입력해주세요.");
      else if (errMessage === "시작일을 입력해주세요.")
        confirmAlert("warning", "시작일을 입력해주세요.");
      else if (errMessage === "경기 번호가 없습니다.")
        confirmAlert("warning", "경기 번호가 없습니다.");
      else if (errMessage === "장소를 입력해주세요.")
        confirmAlert("warning", "장소를 입력해주세요.");
      else if (errMessage === "5대5 경기여부를 입력해주세요.")
        confirmAlert("warning", "5대5 경기여부를 입력해주세요.");
      else if (errMessage === "대회를 찾을 수 없습니다.")
        confirmAlert("warning", "대회를 찾을 수 없습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = "/jeju-competition/info";
        });
      else if (errMessage === "일정등록 단계가 아닙니다.")
        confirmAlert("warning", "일정이 등록된 단계가 아닙니다.").then(
          (res) => {
            if (res.isConfirmed)
              window.location.href = `/jeju-competition/info/${id}`;
          },
        );
    });
};

export const FetchDeleteSchedule = async (id: string) => {
  const session = await getSession();
  return Api.delete(`/v1/api/competition/delete/schedule/${id}`, {
    headers: {
      Authorization: session?.accessToken,
    },
  }).then((res) => {
    if (res.status === 200) {
      confirmAlert("success", "완료", "대회일정이 삭제되었습니다.").then(
        (res) => {
          if (res.isConfirmed)
            window.location.href = `/jeju-competition/info/${id}`;
        },
      );
    }
  });
};

export const FetchAddResult = async (
  id: string,
  requests: addCompetitionResultType[],
) => {
  const request: { requests: addCompetitionResultType[] } = {
    requests: requests,
  };
  const session = await getSession();
  return Api.post(`/v1/api/competition/post/result/${id}`, request, {
    headers: {
      Authorization: session?.accessToken,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "대회결과등록이 완료되었습니다.").then(
          (res) => {
            if (res.isConfirmed)
              window.location.href = `/jeju-competition/info/${id}`;
          },
        );
      }
    })
    .catch((err) => {
      const errMessage: string = err.response.data.detailMessage;
      if (errMessage === "스테이지를 입력해주세요.")
        confirmAlert("warning", "floor를 입력해주세요.");
      else if (errMessage === "종별을 입력해주세요.")
        confirmAlert("warning", "종별을 입력해주세요.");
      else if (errMessage === "HOME 팀명을 입력해주세요.")
        confirmAlert("warning", "HOME 팀명을 입력해주세요.");
      else if (errMessage === "AWAY 팀명을 입력해주세요.")
        confirmAlert("warning", "AWAY 팀명을 입력해주세요.");
      else if (errMessage === "시작일을 입력해주세요.")
        confirmAlert("warning", "시작일을 입력해주세요.");
      else if (errMessage === "경기 번호가 없습니다.")
        confirmAlert("warning", "경기 번호가 없습니다.");
      else if (errMessage === "장소를 입력해주세요.")
        confirmAlert("warning", "장소를 입력해주세요.");
      else if (errMessage === "5대5 경기여부를 입력해주세요.")
        confirmAlert("warning", "5대5 경기여부를 입력해주세요.");
      else if (errMessage === "점수는 0점 이상입니다.")
        confirmAlert("warning", "점수는 0점 이상입니다.");
      else if (errMessage === "점수는 200점 이하입니다.")
        confirmAlert("warning", "점수는 200점 이하입니다.");
      else if (errMessage === "점수를 입력해주세요.")
        confirmAlert("warning", "점수를 입력해주세요.");
      else if (errMessage === "대회를 찾을 수 없습니다.")
        confirmAlert("warning", "대회를 찾을 수 없습니다.").then((res) => {
          if (res.isConfirmed) window.location.href = "/jeju-competition/info";
        });
      else if (errMessage === "일정 먼저 등록 바랍니다.")
        confirmAlert("warning", "일정을 먼저 등록해주세요.").then((res) => {
          if (res.isConfirmed)
            window.location.href = `/jeju-competition/info/${id}`;
        });
    });
};
