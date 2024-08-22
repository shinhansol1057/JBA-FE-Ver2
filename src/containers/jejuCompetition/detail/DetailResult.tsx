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
            <p
              className={
                "font-bold text-[12px] sm:text-[14px] md:text-[20px] ml-[10px] mb-[5px]"
              }
            >
              {result.division}
            </p>
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
