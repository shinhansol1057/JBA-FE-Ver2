import React, { useEffect, useState } from "react";
import {
  competitionDetail,
  competitionResult,
  competitionResultRow,
} from "@/types/CompetitionType";
import DetailResultDivisionSelectBar from "@/containers/jejuCompetition/detail/DetailResultDivisionSelectBar";
import CompetitionResultRowBox from "@/components/competition/CompetitionResultRowBox";

type Props = {
  detailData: competitionDetail;
  resultData: competitionResult[];
};
const DetailResult = ({ detailData, resultData }: Props) => {
  const [divisionFilter, setDivisionFilter] = useState<string>("전체");
  const [filteredResultData, setFilteredResultData] = useState<
    competitionResult[]
  >([]);
  useEffect(() => {
    if (divisionFilter === "전체") {
      setFilteredResultData(resultData);
    } else {
      setFilteredResultData(
        resultData.filter((data) => data.division === divisionFilter),
      );
    }
  }, [divisionFilter, resultData]);

  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      <DetailResultDivisionSelectBar
        detailData={detailData}
        divisionFilter={divisionFilter}
        setDivisionFilter={setDivisionFilter}
      />
      {filteredResultData.map((result: competitionResult, i: number) => {
        return (
          <div key={i} className={"mt-[50px]"}>
            <div
              className={
                "flex justify-center items-center bg-amber-400 mb-[5px] rounded-[8px] " +
                "text-[12px] sm:text-[14px] md:text-[20px] " +
                "h-[30px] sm:h-[40px] md:h-[50px] "
              }
            >
              <p>{result.division}</p>
            </div>
            {result.getResultResponseRows.map((row: competitionResultRow) => {
              return (
                <CompetitionResultRowBox
                  key={row.competitionResultId}
                  data={row}
                  phase={detailData.phase}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DetailResult;
