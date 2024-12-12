"use client";
import React, { useEffect, useState } from "react";
import {
  addCompetitionScheduleRowType,
  addCompetitionScheduleType,
  competitionResultType,
  divisionResponseType,
} from "@/types/CompetitionType";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FetchGetCompetitionDetail,
  FetchGetCompetitionScheduleAndResult,
  FetchUpdateSchedule,
} from "@/services/CompetitionApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import SubTitle from "@/components/layout/SubTitle";
import PostTitle from "@/components/common/PostTitle";
import AddScheduleDivisionBox from "@/containers/jejuCompetition/schedule/AddScheduleDivisionBox";
import { getDateAndTimeToString } from "@/utils/FormDate";

const UpdateSchedule = ({ id }: { id: string }) => {
  const [addCompetitionScheduleList, setAddCompetitionScheduleList] = useState<
    addCompetitionScheduleType[]
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
    queryFn: () => FetchGetCompetitionScheduleAndResult(id),
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
      "대회일정 수정",
      "대회일정을 수정하시겠습니까?",
      async () => {
        id && (await FetchUpdateSchedule(id, addCompetitionScheduleList));
      },
    );
  };

  useEffect(() => {
    if (scheduleData) {
      scheduleData?.map((s: competitionResultType, index: number): void => {
        const list: addCompetitionScheduleRowType[] =
          s?.getResultResponseRows?.map((row) => {
            return {
              gameNumber: row.gameNumber,
              startDate: getDateAndTimeToString(
                new Date(row.startDate ?? new Date()),
              ),
              floor: row.floor,
              place: row.place,
              homeName: row.homeName,
              awayName: row.awayName,
              state5x5: row.state5x5,
            };
          });
        const initialData: addCompetitionScheduleType = {
          division: s.division,
          postCompetitionScheduleRow: list,
        };

        setAddCompetitionScheduleList((prevState) => [
          ...prevState,
          initialData,
        ]);
      });
    }
  }, [scheduleData]);
  return (
    <div className={"flex flex-col mt-5 w-[90%] md:w-[800px]"}>
      <SubTitle title={"대회일정 수정"} />
      <div className={"my-5"}>
        <PostTitle title={detailData?.title} />
      </div>
      {detailData?.divisions.map(
        (division: divisionResponseType, i: number) => {
          return (
            <AddScheduleDivisionBox
              key={"division" + i}
              divisionIndex={i}
              places={detailData?.places}
              addCompetitionScheduleList={addCompetitionScheduleList}
              setAddCompetitionScheduleList={setAddCompetitionScheduleList}
            />
          );
        },
      )}
      <div className={"grid grid-cols-2 gap-2.5 md:gap-5 mb-12"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => submitHandler()} text={"수정"} />
      </div>
    </div>
  );
};

export default UpdateSchedule;
