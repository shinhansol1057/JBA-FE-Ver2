import React, { useState } from "react";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { competitionDetailType } from "@/types/CompetitionType";
import { IoMenu } from "react-icons/io5";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchDeleteSchedule } from "@/services/CompetitionApi";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { FindAdminRole } from "@/utils/JwtDecoder";
import { useRouter } from "next/navigation";

type Props = {
  detailData: competitionDetailType;
  divisionFilter: string;
  setDivisionFilter: (value: ((prevState: string) => string) | string) => void;
};
const DetailResultDivisionSelectBar = ({
  detailData,
  divisionFilter,
  setDivisionFilter,
}: Props) => {
  const isAdmin = typeof window !== "undefined" && FindAdminRole();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div>
      <div
        className={
          "w-[280px] sm:w-[400px] md:w-[800px] px-[7px] bg-white rounded-[8px] shadow-xl "
        }
      >
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <CompetitionLabel
            content={"종별선택"}
            color={""}
            bold={true}
            long={true}
          />
          <IoMenu
            color={"#4B4B4B"}
            className={
              "mr-[3px] text-[20px] sm:text-[25px] md:text-[35px] cursor-pointer " +
              (!isAdmin ? "hidden " : "")
            }
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div
          className={
            "flex justify-between items-center border-b border-solid border-[#D9D9D9] " +
            "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
          }
        >
          <div
            className={
              "grid grid-cols-6 gap-2 " +
              "text-[10px] sm:text-[12px] md:text-[16px] py-[10px]"
            }
          >
            <button
              onClick={() => setDivisionFilter("전체")}
              className={
                "pl-[3px] hover:font-bold " +
                (divisionFilter === "전체" ? "text-blue-700" : "")
              }
            >
              전체
            </button>
            {detailData.divisions.map((division: string, i: number) => {
              return (
                <button
                  key={i}
                  onClick={() => setDivisionFilter(division)}
                  className={
                    "hover:font-bold " +
                    (divisionFilter === division ? "text-blue-700" : "")
                  }
                >
                  {division}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <UpdateDeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteHandler={() => {
          confirmAndCancelAlertWithLoading(
            "warning",
            "일정을 삭제하겠습니까?",
            "삭제된 일정은 복구할 수 없고 대회 개요는 보존됩니다.",
            async () => {
              FetchDeleteSchedule(detailData.competitionId.toString());
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
