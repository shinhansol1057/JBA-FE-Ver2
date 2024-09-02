import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";

export const FetchGetUserInfo = () => {
  return Api.get("/v1/api/user/get/user-info");
};

export const FetchUpdateUserInfo = (request: {
  name: string;
  phoneNum: string;
  birth: string;
  team: string;
}) => {
  return Api.put("/v1/api/user/update", request)
    .then((res) => {
      if (res.status === 200) {
        confirmAlert("success", "프로필을 변경하였습니다").then((res) => {
          if (res.isConfirmed) window.location.href = "/user/my-page";
        });
      }
    })
    .catch((err) => {
      const message = err.response.data.detailMessage;
      if (message === "비어 있을 수 없습니다")
        confirmAlert("warning", "프로필 수정 실패", "빈칸을 모두 채워주세요.");
      else if (message === "휴대폰번호 유효성 검사 실패")
        confirmAlert("warning", "휴대폰번호를 정확히 입력해주세요.");
      else if (message === "주민번호 유효성 검사 실패")
        confirmAlert("warning", "주민번호를 정확히 입력해주세요.");
      else if (message === "이미 해당 휴대폰 번호로 가입된 유저가 있습니다.")
        confirmAlert("warning", "이미 가입된 휴대폰번호입니다.");
    });
};

export const FetchUpdatePassword = (
  prevPW: string,
  newPW: string,
  newPWConfirm: string,
) => {
  const request: { prevPW: string; newPW: string; newPWConfirm: string } = {
    prevPW,
    newPW,
    newPWConfirm,
  };
  return Api.put("/v1/api/user/update/password", request)
    .then((res) => {
      if (res.status === 200) {
        confirmAlert(
          "success",
          "비밀번호 변경 완료",
          "다시 로그인해주세요.",
        ).then((res) => {
          setAccessToken(null);
          if (res.isConfirmed) window.location.href = "/login";
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
