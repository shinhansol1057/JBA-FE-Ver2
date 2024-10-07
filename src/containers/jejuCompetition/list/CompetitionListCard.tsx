import React from "react";
import { competitionStatusCalculator } from "@/utils/CompetitionStatusCalculator";
import moment from "moment";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

type Props = {
  data: any;
};
const CompetitionListCard = ({ data }: Props) => {
  const [scrollY, setScrollY] = useLocalStorage("competitionListScroll", 0);
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
        "cursor-pointer rounded-lg shadow-xl flex flex-col justify-between hover:bg-[rgba(0,0,0,0.3)] " +
        "py-2.5 sm:py-5 " +
        "pl-2.5 sm:pl-5 " +
        "w-full h-24 sm:h-28 md:h-36 " +
        "mb-2.5 md:mb-5 " +
        (status === "진행중" ? "bg-black " : "bg-white ")
      }
      onClick={() => setScrollY(window.scrollY)}
      href={`/jeju-competition/info/${data.competitionId}`}
    >
      <div className={"text-sm sm:text-base md:text-xl"}>
        <p
          className={
            (status === "예정"
              ? "text-[#DF1A1A] "
              : status === "진행중"
                ? "text-[#5B6BFF] "
                : "text-black ") + "font-bold "
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
          "text-sm sm:text-base md:text-xl " +
          (status === "진행중" ? "text-white" : "text-black")
        }
      >
        {startDate} ~ {endDate}
      </p>
    </Link>
  );
};

export default CompetitionListCard;
