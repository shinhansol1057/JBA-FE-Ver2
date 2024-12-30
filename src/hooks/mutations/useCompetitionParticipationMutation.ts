import { useMutation } from "@tanstack/react-query";
import { FetchUpdateParticipation } from "@/services/participationApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { useRouter } from "next/navigation";
import axios from "axios";
import queryClient from "@/services/queryClient";
import { queryKeys } from "@/constants";

const useUpdateParticipation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: FetchUpdateParticipation,
    onSuccess: async (data, variables, context) => {
      await confirmAlert("success", "수정 완료!").then((res) => {
        if (res.isConfirmed) {
          window.location.href = `/competition-participation/${data?.data.data}`;
        }
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMPETITION_DETAIL, data?.data.data],
      });
    },
    onError: async (error) => {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data.detailMessage;
        if (message === "이름은 필수입니다.")
          await confirmAlert("warning", "이름을 입력해주세요.");
        else if (
          message === "전화번호는 필수입니다." ||
          message === "휴대폰번호 유효성 검사 실패"
        )
          await confirmAlert("warning", "휴대폰 번호를 정확히 입력해주세요.");
        else if (
          message === "이메일은 필수입니다." ||
          message === "이메일 형식이 아닙니다."
        )
          await confirmAlert("warning", "이메일을 정확히 입력해주세요.");
        else if (message === "divisionId가 잘못되었습니다.")
          await confirmAlert("warning", "종별 선택이 잘못되었습니다.").then(
            (res) => {
              if (res.isConfirmed) router.refresh();
            },
          );
        else
          await confirmAlert("error", "오류 발생!", "다시 시도해주세요").then(
            (res) => {
              if (res.isConfirmed) router.refresh();
            },
          );
      }
    },
  });
};

const useCompetitionParticipationMutation = () => {
  const updateParticipation = useUpdateParticipation();

  return {
    updateParticipation,
  };
};

export default useCompetitionParticipationMutation;
