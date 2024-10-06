import React from "react";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { competitionResultType } from "@/types/CompetitionType";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  selectInfo: boolean;
  setSelectInfo: (value: ((prevState: boolean) => boolean) | boolean) => void;
  phase: string;
  resultData: competitionResultType[];
  id: string;
};
const DetailCategory = ({
  selectInfo,
  setSelectInfo,
  phase,
  resultData,
  id,
}: Props) => {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  let resultCount: number = 0;
  resultData.forEach((result) => {
    resultCount += result.getResultResponseRows.length;
  });
  return (
    <div
      className={
        "grid grid-cols-2 shadow-xl rounded-lg bg-[rgba(245,245,245,0.1)] border border-solid border-borderColor " +
        "h-10 sm:h-12 md:h-16 " +
        "text-sm sm:text-base md:text-xl " +
        "my-2.5 md:my-5 "
      }
    >
      <button
        className={selectInfo ? "rounded-lg bg-black text-white" : ""}
        onClick={() => setSelectInfo(true)}
      >
        대회개요
      </button>
      <button
        className={selectInfo ? "" : "rounded-lg bg-black text-white"}
        onClick={async () => {
          if (phase === "INFO" || resultCount === 0) {
            if (isAdmin) {
              await confirmAndCancelAlertWithLoading(
                "question",
                "대회일정 없음",
                "대회일정을 등록하시겠습니까?",
              ).then((res) => {
                if (res.isConfirmed) {
                  router.push(`/jeju-competition/schedule/add/${id}`);
                } else {
                  return setSelectInfo(true);
                }
              });
            } else {
              confirmAlert(
                "warning",
                "대회일정 없음",
                "대회일정이 아직 등록되지 않았습니다.",
              );
              setSelectInfo(true);
            }
          } else {
            setSelectInfo(false);
          }
        }}
      >
        {phase === "FINISH" ? "대회결과" : "대회일정"}
      </button>
    </div>
  );
};

export default DetailCategory;
