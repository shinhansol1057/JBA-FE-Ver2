import React from "react";
import { competitionStatusCalculator } from "@/utils/CompetitionStatusCalculator";
import moment from "moment";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

type Props = {
  data: any;
};
const CompetitionListCard = ({ data }: Props) => {
  const [setScrollY] = useLocalStorage<number>("competitionListScroll", 0);
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
        "cursor-pointer rounded-[8px] shadow-xl flex flex-col justify-between hover:bg-[rgba(0,0,0,0.3)] " +
        "py-[15px] sm:py-[20px] md:py-[30px] " +
        "pl-[15px] sm:pl-[20px] md:pl-[30px] " +
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[100px] sm:h-[120px] md:h-[150px] " +
        "mb-[10px] md:mb-[20px] " +
        (status === "진행중" ? "bg-black " : "bg-white ")
      }
      onClick={() => setScrollY(window.scrollY)}
      href={`/jeju-competition/info/${data.competitionId}`}
    >
      <div className={"text-[12px] sm:text-[14px] md:text-[20px]"}>
        <p
          className={
            (status === "예정"
              ? "text-[#DF1A1A] "
              : status === "진행중"
                ? "text-[#5B6BFF] "
                : "text-black ") + "font-bold mb-[5px]"
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
          "text-[10px] sm:text-[12px] md:text-[18px] " +
          (status === "진행중" ? "text-white" : "text-black")
        }
      >
        {startDate} ~ {endDate}
      </p>
    </Link>
  );
};

export default CompetitionListCard;
