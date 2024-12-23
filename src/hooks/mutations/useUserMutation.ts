import { useMutation } from "@tanstack/react-query";
import { FetchUpdateUserInfo } from "@/services/user/accountApi";
import axios from "axios";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import queryClient from "@/services/queryClient";
import { queryKeys } from "@/constants";
import { useRouter } from "next/navigation";

const useUpdateUserInfo = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: FetchUpdateUserInfo,
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER_INFO],
      });
      await confirmAlert("success", "프로필 변경 성공").then(async (res) => {
        if (res.isConfirmed) router.back();
      });
    },
  });
};

const useUserMutation = () => {
  const updateUserInfo = useUpdateUserInfo();

  return { updateUserInfo };
};

export default useUserMutation;
