import { useMutation } from "@tanstack/react-query";
import {
  FetchUpdatePassword,
  FetchUpdateUserInfo,
} from "@/services/user/accountApi";
import axios from "axios";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import queryClient from "@/services/queryClient";
import { queryKeys } from "@/constants";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const useUpdateUserInfo = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: FetchUpdateUserInfo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER_INFO],
      });
      await confirmAlert("success", "프로필 변경 성공").then(async (res) => {
        if (res.isConfirmed) router.back();
      });
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.detailMessage;
        if (message === "비어 있을 수 없습니다")
          await confirmAlert(
            "error",
            "프로필 편집 실패",
            "빈칸을 모두 채워주세요.",
          );
        else if (message === "휴대폰번호 유효성 검사 실패")
          await confirmAlert(
            "error",
            "휴대폰번호 오류",
            "휴대폰번호를 정확히 입력해주세요.",
          );
        else if (message === "이미 해당 휴대폰 번호로 가입된 유저가 있습니다.")
          await confirmAlert(
            "error",
            "휴대폰번호 오류",
            "이미 가입된 휴대폰번호입니다.",
          );
      }
    },
  });
};

const useUpdatePassword = () => {
  return useMutation({
    mutationFn: FetchUpdatePassword,
    onSuccess: async () => {
      await confirmAlert(
        "success",
        "비밀번호 변경 완료",
        "다시 로그인해주세요.",
      ).then((res) => {
        if (res.isConfirmed) {
          signOut();
        }
      });
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.detailMessage;
        if (message === "비어 있을 수 없습니다")
          await confirmAlert(
            "warning",
            "비밀번호 변경 실패",
            "빈칸을 모두 채워주세요.",
          );
        else if (
          message ===
          "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다."
        )
          await confirmAlert(
            "warning",
            "비밀번호 오류",
            "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.",
          );
        else if (
          message === "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다."
        )
          await confirmAlert(
            "warning",
            "비밀번호 오류",
            "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.",
          );
        else if (message === "비밀번호와 비밀번호 확인이 같지 않습니다.")
          await confirmAlert(
            "warning",
            "비밀번호 오류",
            "비밀번호와 비밀번호 확인이 같지 않습니다.",
          );
        else if (message === "자격 증명에 실패하였습니다.")
          await confirmAlert(
            "warning",
            "비밀번호 오류",
            "현재 비밀번호가 맞지 않습니다.",
          );
      }
    },
  });
};

const useUserMutation = () => {
  const updateUserInfoMutation = useUpdateUserInfo();
  const updatePasswordMutation = useUpdatePassword();
  return { updateUserInfoMutation, updatePasswordMutation };
};

export default useUserMutation;
