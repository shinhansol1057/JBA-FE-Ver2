"use client";
import React, { useEffect, useState } from "react";
import {
  AddCompetitionResultRowType,
  AddCompetitionResultType,
  CompetitionDetailType,
  CompetitionResultType,
  DivisionResponseType,
} from "@/types/competitionType";
import { useRouter } from "next/navigation";
import { FetchAddResult } from "@/services/competitionApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { getDateAndTimeToString } from "@/utils/FormDate";
import SubTitle from "@/components/layout/SubTitle";
import PostTitle from "@/components/common/PostTitle";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import AddResultDivisionBox from "@/containers/jejuCompetition/schedule/AddResultDivisionBox";

type Props = {
  id: string;
  detailData: CompetitionDetailType;
  resultData: CompetitionResultType[];
};
const AddResult = ({ id, detailData, resultData }: Props) => {
  const [addCompetitionResultList, setAddCompetitionResultList] = useState<
    AddCompetitionResultType[]
  >([]);
  const router = useRouter();

  const submitHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "대회결과 등록",
      "대회결과를 등록하시겠습니까?",
      async () => {
        id && (await FetchAddResult(id, addCompetitionResultList));
      },
    );
  };

  useEffect(() => {
    if (resultData) {
      resultData?.map((s: CompetitionResultType): void => {
        const list: AddCompetitionResultRowType[] =
          s?.getResultResponseRows?.map((row) => {
            return {
              competitionResultId: row.competitionResultId,
              gameNumber: row.gameNumber,
              startDate: getDateAndTimeToString(
                new Date(row.startDate ?? new Date()),
              ),
              floor: row.floor,
              place: row.place,
              homeName: row.homeName,
              awayName: row.awayName,
              state5x5: row.state5x5,
              homeScore: row.homeScore,
              awayScore: row.awayScore,
              fileUrl: row.fileUrl,
              fileName: row.fileName,
            };
          });
        const initialData: AddCompetitionResultType = {
          division: s.division,
          postResultRequestRows: list,
        };

        setAddCompetitionResultList((prevState) => [...prevState, initialData]);
      });
    }
  }, [resultData]);
  return (
    <div className={"flex flex-col mt-5 w-[90%] md:w-[800px]"}>
      <SubTitle title={"대회결과 등록"} />
      <div className={"my-5"}>
        <PostTitle title={detailData?.title} />
      </div>
      {detailData?.divisions.map(
        (division: DivisionResponseType, i: number) => {
          return (
            <AddResultDivisionBox
              key={"division" + i}
              divisionIndex={i}
              places={detailData?.places}
              addCompetitionResultList={addCompetitionResultList}
              setAddCompetitionResultList={setAddCompetitionResultList}
            />
          );
        },
      )}
      <div className={"grid grid-cols-2 gap-2.5 md:gap-5 mb-12"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => submitHandler()} />
      </div>
    </div>
  );
};

export default AddResult;
