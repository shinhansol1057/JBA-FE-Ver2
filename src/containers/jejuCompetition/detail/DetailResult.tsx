import React, { useEffect, useState } from "react";
import {
  competitionDetailType,
  competitionResultType,
  competitionResultRowType,
} from "@/types/CompetitionType";
import DetailResultDivisionSelectBar from "@/containers/jejuCompetition/detail/DetailResultDivisionSelectBar";
import CompetitionResultRowBox from "@/components/competition/CompetitionResultRowBox";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  detailData: competitionDetailType;
  resultData: competitionResultType[];
};
const DetailResult = ({ detailData, resultData }: Props) => {
  const [divisionFilter, setDivisionFilter] = useState<string>("전체");
  const [filteredResultData, setFilteredResultData] = useState<
    competitionResultType[]
  >([]);
  const router = useRouter();
  const isAdmin = useIsAdmin();
  useEffect(() => {
    if (divisionFilter === "전체") {
      setFilteredResultData(resultData);
    } else {
      setFilteredResultData(
        resultData.filter((data) => data.division === divisionFilter),
      );
    }
  }, [divisionFilter, resultData]);

  const addResultHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "대회결과를 등록하겠습니까?",
    ).then((res) => {
      if (res.isConfirmed)
        router.push(`/jeju-competition/result/add/${detailData.competitionId}`);
    });
  };
  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      {isAdmin && detailData.phase === "SCHEDULE" ? (
        <div className={"flex justify-end mb-[10px]"}>
          <button
            className={
              "font-bold rounded-[8px] bg-black text-white " +
              "text-[12px] sm:text-[14px] md:text-[18px] " +
              "w-[60px] sm:w-[80px] md:w-[100px] " +
              "h-[30px] sm:h-[30px] md:h-[50px]"
            }
            onClick={() => addResultHandler()}
          >
            결과등록
          </button>
        </div>
      ) : (
        ""
      )}
      <DetailResultDivisionSelectBar
        detailData={detailData}
        divisionFilter={divisionFilter}
        setDivisionFilter={setDivisionFilter}
      />
      {filteredResultData.map((result: competitionResultType, i: number) => {
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
            {result.getResultResponseRows.map(
              (row: competitionResultRowType) => {
                return (
                  <CompetitionResultRowBox
                    key={row.competitionResultId}
                    data={row}
                    phase={detailData.phase}
                  />
                );
              },
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DetailResult;
