import React from "react";
import { competitionResultRow } from "@/types/CompetitionType";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import formatDate from "@/utils/FormDate";
import { GrDocumentDownload } from "react-icons/gr";
import { handleDownload } from "@/utils/HandleDownload";
import confirmAlert from "@/libs/alert/ConfirmAlert";

type Props = {
  data: competitionResultRow;
  phase: string;
};
const CompetitionResultRowBox = ({ data, phase }: Props) => {
  return (
    <div
      className={
        "w-full border border-solid border-borderColor shadow-xl rounded-[8px] " +
        "h-[90px] sm:h-[105px] md:h-[120px] text-[10px] sm:text-[12px] md:text-[16px] mb-[10px]"
      }
    >
      <div
        className={
          "flex flex-row items-center border-b border-solid border-[#D9D9D9] mx-[7px] " +
          "h-[30px] sm:h-[35px] md:h-[40px]"
        }
      >
        <div className={"w-[50%]"}>
          <CompetitionLabel content={"결승"} color={""} bold={true} />
        </div>
        <div className={"w-[50%] flex flex-row items-center"}>
          <CompetitionLabel
            content={"일시"}
            color={"text-[#4B4B4B] "}
            bold={true}
          />
          <p>{formatDate(new Date(data.startDate))}</p>
        </div>
      </div>
      <div
        className={
          "flex flex-row items-center border-b border-solid border-[#D9D9D9] mx-[7px] " +
          "h-[30px] sm:h-[35px] md:h-[40px] "
        }
      >
        <div className={"w-[50%] flex flex-row items-center"}>
          <CompetitionLabel
            content={"장소"}
            color={"text-[#4B4B4B] "}
            bold={true}
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
          <GrDocumentDownload
            className={
              "text-[15px] sm:text-[20px] md:text-[25px] mr-[10px] md:mr-[20px] cursor-pointer"
            }
            onClick={() => {
              if (data.filePath) {
                handleDownload(data.filePath, data.fileName);
              } else {
                confirmAlert("warning", "등록된 파일이 없습니다.");
              }
            }}
          />
        </div>
      </div>
      <div
        className={
          "bg-black flex flex-row items-center justify-center rounded-b-[8px] text-white " +
          "h-[30px] sm:h-[35px] md:h-[40px] "
        }
      >
        <p className={"mr-[10px] md:mr-[20px]"}>{data.homeName}</p>
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
        <p className={"mx-[10px] md:mx-[20px]"}>vs</p>
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
        <p className={"ml-[10px] md:ml-[20px]"}>{data.awayName}</p>
      </div>
    </div>
  );
};

export default CompetitionResultRowBox;
