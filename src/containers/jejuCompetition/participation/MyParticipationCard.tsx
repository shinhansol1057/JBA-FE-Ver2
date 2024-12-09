import React from "react";
import { calculatorParticipationDuration } from "@/utils/calculatorCompetitionStatus";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  applicationDate: string;
  applicationStartDate: string;
  applicationEndDate: string;
  division: string;
  id: number;
};
const MyParticipationCard = ({
  title,
  applicationDate,
  applicationStartDate,
  applicationEndDate,
  division,
  id,
}: Props) => {
  const router = useRouter();
  const isApplicationDuration = calculatorParticipationDuration(
    new Date(applicationStartDate),
    new Date(applicationEndDate),
  );

  return (
    <div
      className={
        "w-full px-2 md:p-4 flex flex-col justify-between mb-2 rounded-lg min-h-24" +
        " md:min-h-32 cursor-pointer shadow-2xl text-sm md:text-xl " +
        (isApplicationDuration
          ? "bg-black text-white hover:bg-[#4B4B4B]"
          : "bg-white text-black hover:bg-[#B5B5B5]")
      }
      onClick={() => router.push(`/competition-participation/${id}`)}
    >
      <div
        className={
          "flex flex-row justify-between font-bold py-2 border-solid border-b-[1px] " +
          (isApplicationDuration ? "border-white " : "border-[#D9D9D9] ")
        }
      >
        <h3 className={"mb-0.5"}>{title}</h3>
        <p className={"whitespace-nowrap"}>{division}</p>
      </div>
      <div
        className={
          "py-2 flex items-center border-solid border-b-[1px] " +
          (isApplicationDuration ? "border-white " : "border-[#D9D9D9] ")
        }
      >
        <p
          className={isApplicationDuration ? "text-white " : "text-[#4B4B4B] "}
        >
          참가 신청 기간
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;{applicationStartDate} ~ {applicationEndDate}
        </p>
      </div>
      <div className={"py-2 flex items-center"}>
        <p
          className={isApplicationDuration ? "text-white " : "text-[#4B4B4B] "}
        >
          나의 신청 일시
        </p>
        <p className={"text-[#DF1A1A]"}>
          &nbsp;&nbsp;&nbsp;{applicationDate.replace("T", " ").substring(0, 16)}
        </p>
      </div>
    </div>
  );
};

export default MyParticipationCard;
