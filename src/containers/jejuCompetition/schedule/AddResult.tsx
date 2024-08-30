"use client";
import React, { useEffect, useState } from "react";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";
import {
  addCompetitionResultRowType,
  addCompetitionResultType,
  competitionResultType,
} from "@/types/CompetitionType";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FetchAddResult,
  FetchGetCompetitionDetail,
  FetchGetCompetitionResult,
} from "@/services/CompetitionApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { getDateAndTimeToString } from "@/utils/FormDate";
import SubTitle from "@/components/layout/SubTitle";
import PostTitle from "@/components/common/PostTitle";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import AddResultDivisionBox from "@/containers/jejuCompetition/schedule/AddResultDivisionBox";

const AddResult = ({ id }: { id: string }) => {
  useAxiosInterceptor();
  const [addCompetitionResultList, setAddCompetitionResultList] = useState<
    addCompetitionResultType[]
  >([]);
  const router = useRouter();

  const { data: detailData } = useQuery({
    queryKey: ["getCompetitionDetail", id],
    queryFn: () => FetchGetCompetitionDetail(id),
    select: (result) => result?.data.data,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const { data: scheduleData } = useQuery({
    queryKey: ["getSchedule", id],
    queryFn: () => FetchGetCompetitionResult(id),
    select: (result) => result?.data.data,
    gcTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const submitHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "대회결과 등록",
      "대회결과를 등록하시겠습니까?",
      async () => {
        id && (await FetchAddResult(id, addCompetitionResultList));
      },
    );
  };

  useEffect(() => {
    if (scheduleData) {
      scheduleData?.map((s: competitionResultType, index: number): void => {
        const list: addCompetitionResultRowType[] =
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
              filePath: row.filePath,
              fileName: row.fileName,
            };
          });
        const initialData: addCompetitionResultType = {
          division: s.division,
          postResultRequestRows: list,
        };

        setAddCompetitionResultList((prevState) => [...prevState, initialData]);
      });
    }
  }, [scheduleData]);
  console.log(scheduleData);
  return (
    <div
      className={"flex flex-col mt-[20px] w-[280px] sm:w-[400px] md:w-[800px]"}
    >
      <SubTitle title={"대회결과 등록"} />
      <div className={"my-[20px]"}>
        <PostTitle title={detailData?.title} />
      </div>
      {detailData?.divisions.map((division: string, i: number) => {
        return (
          <AddResultDivisionBox
            key={"division" + i}
            divisionIndex={i}
            places={detailData?.places}
            addCompetitionResultList={addCompetitionResultList}
            setAddCompetitionResultList={setAddCompetitionResultList}
          />
        );
      })}
      <div className={"flex mb-[50px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => submitHandler()} />
      </div>
    </div>
  );
};

export default AddResult;
