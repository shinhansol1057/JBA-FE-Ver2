"use client";
import React, { useEffect, useState } from "react";
import SubTitle from "@/components/layout/SubTitle";
import { useQuery } from "@tanstack/react-query";
import {
  FetchAddSchedule,
  FetchGetCompetitionDetail,
} from "@/services/CompetitionApi";
import {
  AddCompetitionScheduleRowType,
  AddCompetitionScheduleType,
  DivisionResponseType,
} from "@/types/competitionType";
import PostTitle from "@/components/common/PostTitle";
import AddScheduleDivisionBox from "@/containers/jejuCompetition/schedule/AddScheduleDivisionBox";
import { getDateAndTimeToString } from "@/utils/FormDate";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
const AddSchedule = ({ id }: Props) => {
  const [addCompetitionScheduleList, setAddCompetitionScheduleList] = useState<
    AddCompetitionScheduleType[]
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

  const submitHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "대회일정 등록",
      "대회일정을 등록하시겠습니까?",
      async () => {
        id && (await FetchAddSchedule(id, addCompetitionScheduleList));
      },
    );
  };

  useEffect(() => {
    if (detailData) {
      setAddCompetitionScheduleList([]);
      detailData.divisions.map(
        (d: DivisionResponseType, index: number): void => {
          const initialRow: AddCompetitionScheduleRowType = {
            gameNumber: index + 1,
            startDate: getDateAndTimeToString(
              new Date(
                new Date(detailData?.startDate).getTime() + 3600000 * index,
              ),
            ),
            floor: "",
            place: detailData.places[0].placeName,
            homeName: "",
            awayName: "",
            state5x5: true,
          };
          const initialData: AddCompetitionScheduleType = {
            division: d.divisionName,
            postCompetitionScheduleRow: [initialRow],
          };
          setAddCompetitionScheduleList((prevState) => [
            ...prevState,
            initialData,
          ]);
        },
      );
    }
  }, [detailData]);

  return (
    <div className={"flex flex-col mt-5 w-[90%] md:w-[800px]"}>
      <SubTitle title={"대회일정 등록"} />
      <div className={"my-5"}>
        <PostTitle title={detailData?.title} />
      </div>
      {detailData?.divisions.map(
        (division: { divisionId: string; divisionName: string }, i: number) => {
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
      <div className={"grid grid-cols-2 gap-2.5 md:gap-5 mb-12 "}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => submitHandler()} />
      </div>
    </div>
  );
};

export default AddSchedule;
