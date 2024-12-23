import { Api } from "@/services/axios/api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { signOut } from "next-auth/react";
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

export const FetchUpdatePassword = async (
  prevPW: string,
  newPW: string,
  newPWConfirm: string,
) => {
  const request: { prevPW: string; newPW: string; newPWConfirm: string } = {
    prevPW,
    newPW,
    newPWConfirm,
  };
  return Api.put("/v1/api/user/update/password", request, {
    headers: {
      Authorization: await getBearerToken(),
    },
  })
    .then((res) => {
      if (res.status === 200) {
        confirmAlert(
          "success",
          "비밀번호 변경 완료",
          "다시 로그인해주세요.",
        ).then((res) => {
          if (res.isConfirmed) {
            signOut();
            window.location.href = "/login";
          }
        });
      }
    })
    .catch((err) => {
      const message = err.response.data.detailMessage;
      if (message === "비어 있을 수 없습니다")
        confirmAlert("warning", "빈칸을 모두 채워주세요.");
      else if (
        message ===
        "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다."
      )
        confirmAlert(
          "warning",
          "비밀번호 오류",
          "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.",
        );
      else if (message === "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.")
        confirmAlert(
          "warning",
          "비밀번호 오류",
          "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.",
        );
      else if (message === "비밀번호와 비밀번호 확인이 같지 않습니다.")
        confirmAlert(
          "warning",
          "비밀번호 오류",
          "비밀번호와 비밀번호 확인이 같지 않습니다.",
        );
      else if (message === "자격 증명에 실패하였습니다.")
        confirmAlert("warning", "현재 비밀번호가 맞지 않습니다.");
    });
};
