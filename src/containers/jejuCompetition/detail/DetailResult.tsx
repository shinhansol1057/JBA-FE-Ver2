import React, { useEffect, useState } from "react";
import {
  CompetitionDetailType,
  CompetitionResultType,
  CompetitionResultRowType,
} from "@/types/competitionType";
import DetailResultDivisionSelectBar from "@/containers/jejuCompetition/detail/DetailResultDivisionSelectBar";
import CompetitionResultRowBox from "@/components/competition/CompetitionResultRowBox";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  detailData: CompetitionDetailType;
  resultData: CompetitionResultType[];
};
const DetailResult = ({ detailData, resultData }: Props) => {
  const [divisionFilter, setDivisionFilter] = useState<string>("전체");
  const [filteredResultData, setFilteredResultData] = useState<
    CompetitionResultType[]
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

  const addResultHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "대회결과를 등록하겠습니까?",
    ).then((res) => {
      if (res.isConfirmed)
        router.push(`/jeju-competition/result/add/${detailData.competitionId}`);
    });
  };
  return (
    <div>
      {isAdmin && detailData.phase === "SCHEDULE" ? (
        <div className={"flex justify-end mb-2.5"}>
          <button
            className={
              "font-bold rounded-lg bg-black text-white " +
              "text-sm sm:text-base md:text-xl " +
              "w-16 sm:w-20 md:w-24 " +
              "h-10 sm:h-12 md:h-14"
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
      {filteredResultData.map((result: CompetitionResultType, i: number) => {
        return (
          <div key={i} className={"mt-4"}>
            <div
              className={
                "flex justify-center items-center bg-amber-400 mb-1 rounded-lg " +
                "text-sm sm:text-base md:text-xl " +
                "h-8 sm:h-10 md:h-12 "
              }
            >
              <p>{result.division}</p>
            </div>
            {result.getResultResponseRows.map(
              (row: CompetitionResultRowType) => {
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
