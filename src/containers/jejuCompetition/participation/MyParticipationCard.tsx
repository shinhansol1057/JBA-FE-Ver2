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
        "w-full p-2 md:p-4 flex flex-col justify-between mb-2 rounded-lg min-h-24 md:min-h-32 cursor-pointer shadow-2xl " +
        (isApplicationDuration
          ? "bg-black text-white hover:bg-[#4B4B4B]"
          : "bg-white text-black hover:bg-[#B5B5B5]")
      }
      onClick={() => router.push(`/competition-participation/${id}`)}
    >
      <div className={"flex flex-col"}>
        <div
          className={
            "flex flex-row justify-between font-bold text-sm md:text-2xl"
          }
        >
          <h3 className={"mb-0.5"}>{title}</h3>
          <p className={"whitespace-nowrap"}>{division}</p>
        </div>
        <p className={"text-sm md:text-lg"}>
          신청일 : {applicationDate.replace("T", " ").substring(0, 16)}
        </p>
      </div>
      <p className={"text-sm md:text-lg"}>
        참가신청 기간 : {applicationStartDate} ~ {applicationEndDate}
      </p>
    </div>
  );
};

export default MyParticipationCard;
