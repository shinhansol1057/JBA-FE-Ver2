import React from "react";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { competitionDetail } from "@/types/CompetitionType";
import { useUserStore } from "@/states/UserStore";

type Props = {
  detailData: competitionDetail;
  divisionFilter: string;
  setDivisionFilter: (value: ((prevState: string) => string) | string) => void;
};
const DetailResultDivisionSelectBar = ({
  detailData,
  divisionFilter,
  setDivisionFilter,
}: Props) => {
  const { AccessToken } = useUserStore();
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
          <HiOutlineDotsHorizontal
            color={"#4B4B4B"}
            size={25}
            className={"mr-[3px] " + (!AccessToken ? "hidden" : "")}
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
    </div>
  );
};

export default DetailResultDivisionSelectBar;
