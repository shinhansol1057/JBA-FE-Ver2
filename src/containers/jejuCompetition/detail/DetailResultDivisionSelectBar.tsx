import React, { useState } from "react";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import {
  CompetitionDetailType,
  DivisionResponseType,
} from "@/types/competitionType";
import { IoMenu } from "react-icons/io5";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchDeleteSchedule } from "@/services/CompetitionApi";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  detailData: CompetitionDetailType;
  divisionFilter: string;
  setDivisionFilter: (value: ((prevState: string) => string) | string) => void;
};
const DetailResultDivisionSelectBar = ({
  detailData,
  divisionFilter,
  setDivisionFilter,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <div className={"px-2 bg-white rounded-lg shadow-xl "}>
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-10 sm:min-h-12 md:min-h-14 "
          }
        >
          <CompetitionLabel
            content={"종별선택"}
            color={""}
            bold={true}
            long={true}
          />
          {isAdmin && (
            <IoMenu
              color={"#4B4B4B"}
              className={
                "mr-1 text-2xl sm:text-3xl md:text-4xl cursor-pointer "
              }
              onClick={() => setModalOpen(true)}
            />
          )}
        </div>
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-10 sm:min-h-12 md:min-h-14 "
          }
        >
          <div
            className={
              "grid grid-cols-6 gap-2 " +
              "text-sm sm:text-base md:text-lg py-[10px]"
            }
          >
            <button
              onClick={() => setDivisionFilter("전체")}
              className={
                "pl-1 hover:font-bold " +
                (divisionFilter === "전체" ? "text-blue-700" : "")
              }
            >
              전체
            </button>
            {detailData.divisions.map(
              (division: DivisionResponseType, i: number) => {
                return (
                  <button
                    key={i}
                    onClick={() => setDivisionFilter(division.divisionName)}
                    className={
                      "hover:font-bold " +
                      (divisionFilter === division.divisionName
                        ? "text-blue-700"
                        : "")
                    }
                  >
                    {division.divisionName}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>
      <UpdateDeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteHandler={async () => {
          await confirmAndCancelAlertWithLoading(
            "warning",
            "일정을 삭제하겠습니까?",
            "삭제된 일정은 복구할 수 없고 대회 개요는 보존됩니다.",
            async () => {
              await FetchDeleteSchedule(detailData.competitionId.toString());
            },
          );
        }}
        updateHandler={() => {
          router.push(
            detailData.phase === "SCHEDULE"
              ? `/jeju-competition/schedule/update/${detailData.competitionId}`
              : `/jeju-competition/result/update/${detailData.competitionId}`,
          );
        }}
      />
    </div>
  );
};

export default DetailResultDivisionSelectBar;
