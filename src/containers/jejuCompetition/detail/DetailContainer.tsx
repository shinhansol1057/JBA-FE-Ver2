import React from "react";
import { competitionDetail } from "@/types/CompetitionType";
import { competitionStatusCalculator } from "@/utils/CompetitionStatusCalculator";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CompetitionLabel from "@/components/CompetitionLabel";

type Props = {
  data: competitionDetail;
};
const DetailContainer = ({ data }: Props) => {
  const status = competitionStatusCalculator(data.startDate, data.endDate);
  return (
    <div
      className={
        "min-h-[400px] w-[280px] sm:w-[400px] md:w-[800px] px-[7px] bg-white rounded-[8px] shadow-xl "
      }
    >
      <div
        className={
          "flex justify-between items-center border-b border-solid border-[#D9D9D9] min-h-[30px]"
        }
      >
        <CompetitionLabel
          content={status}
          color={
            status === "예정"
              ? "text-red-500 "
              : status === "진행중"
                ? "text-blue-700 "
                : "text-black "
          }
          bold={true}
        />
        <HiOutlineDotsHorizontal
          color={"#4B4B4B"}
          size={20}
          className={"mr-[3px]"}
        />
      </div>
      <div
        className={
          "flex items-center border-b border-solid border-[#D9D9D9] min-h-[30px]"
        }
      >
        <CompetitionLabel content={"종별"} color={""} bold={true} />
        <div className={"grid grid-cols-6 gap-2 text-[10px] py-[10px]"}>
          {data.divisions.map((item: string, i: number) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
