import React from "react";
import { competitionStatusCalculator } from "@/utils/CompetitionStatusCalculator";
import moment from "moment";
import Link from "next/link";

type Props = {
  data: any;
};
const CompetitionListCard = ({ data }: Props) => {
  const startDate: string = moment(data.startDate).format("YYYY-MM-DD");
  const endDate: string = moment(data.endDate).format("YYYY-MM-DD");
  const status: string = competitionStatusCalculator(
    data.startDate,
    data.endDate,
  );
  return (
    <Link
      key={data.competitionId}
      className={
        "cursor-pointer w-[280px] h-[100px] rounded-[8px] mt-[10px] shadow-xl flex flex-col justify-between py-[15px] pl-[15px] " +
        (status === "진행중" ? "bg-black" : "bg-white")
      }
      href={`/jeju-competition/info/${data.competitionId}`}
    >
      <div className={"text-[12px]"}>
        <p
          className={
            (status === "예정"
              ? "text-[#DF1A1A] "
              : status === "진행중"
                ? "text-[#5B6BFF] "
                : "text-black ") + "font-bold mb-[10px]"
          }
        >
          {status}
        </p>
        <p className={status === "진행중" ? "text-white" : "text-black"}>
          {data.title}
        </p>
      </div>
      <p
        className={
          "text-[10px] " + (status === "진행중" ? "text-white" : "text-black")
        }
      >
        {startDate} ~ {endDate}
      </p>
    </Link>
  );
};

export default CompetitionListCard;
