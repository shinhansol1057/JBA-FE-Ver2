import React from "react";
import { competitionResultRowType } from "@/types/CompetitionType";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import { GrDocumentDownload } from "react-icons/gr";
import { handleDownload } from "@/utils/HandleDownload";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { formatDate, formatDateWithoutYear } from "@/utils/FormDate";

type Props = {
  data: competitionResultRowType;
  phase: string;
};
const CompetitionResultRowBox = ({ data, phase }: Props) => {
  return (
    <div
      className={
        "w-full border border-solid border-borderColor shadow-xl rounded-lg " +
        "text-sm sm:text-base md:text-lg mb-2.5"
      }
    >
      <div
        className={
          "flex flex-row items-center border-b border-solid border-[#D9D9D9] mx-[7px] " +
          "h-7 sm:h-9 md:h-10"
        }
      >
        <div className={"w-[50%]"}>
          <CompetitionLabel
            content={data.floor}
            color={""}
            bold={true}
            long={false}
          />
        </div>
        <div className={"w-[50%] flex flex-row items-center"}>
          <CompetitionLabel
            content={"일시"}
            color={"text-[#4B4B4B] "}
            bold={true}
            long={false}
          />
          <p className={"text-sm md:text-lg"}>
            {formatDateWithoutYear(new Date(data.startDate))}
          </p>
        </div>
      </div>
      <div
        className={
          "flex flex-row items-center border-b border-solid border-[#D9D9D9] mx-2 " +
          "h-7 sm:h-9 md:h-10 "
        }
      >
        <div className={"w-[50%] flex flex-row items-center"}>
          <CompetitionLabel
            content={"장소"}
            color={"text-[#4B4B4B] "}
            bold={true}
            long={false}
          />
          <p>{data.place}</p>
        </div>
        <div className={"w-[50%] flex flex-row justify-between items-center"}>
          <div className={"flex flex-row"}>
            <CompetitionLabel
              content={"경기번호"}
              color={"text-[#4B4B4B] "}
              bold={true}
              long={true}
            />
            <p>{data.gameNumber}</p>
          </div>
          {phase === "FINISH" && data.filePath ? (
            <GrDocumentDownload
              className={
                "text-base sm:text-xl md:text-3xl mr-2.5 md:mr-5 cursor-pointer"
              }
              onClick={async () => {
                if (data.filePath) {
                  await handleDownload(data.filePath, data.fileName);
                } else {
                  await confirmAlert("warning", "등록된 파일이 없습니다.");
                }
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          "bg-black flex flex-row items-center justify-center rounded-b-lg text-white " +
          "h-7 sm:h-9 md:h-10 "
        }
      >
        <p className={"mr-2.5 md:mr-5"}>{data.homeName}</p>
        <p
          className={
            data.homeScore > data.awayScore
              ? "text-red-500"
              : data.homeScore < data.awayScore
                ? ""
                : "text-green-500"
          }
        >
          {phase === "FINISH" && data.homeScore}
        </p>
        <p className={"mx-2.5 md:mx-5"}>vs</p>
        <p
          className={
            data.homeScore < data.awayScore
              ? "text-red-500"
              : data.homeScore > data.awayScore
                ? ""
                : "text-green-500"
          }
        >
          {phase === "FINISH" && data.awayScore}
        </p>
        <p className={"ml-2.5 md:ml-5"}>{data.awayName}</p>
      </div>
    </div>
  );
};

export default CompetitionResultRowBox;
