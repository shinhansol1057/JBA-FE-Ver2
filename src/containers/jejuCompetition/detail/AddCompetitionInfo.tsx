"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GetFileType } from "@/types/commonType";
import PostInput from "@/components/common/PostInput";
import SubTitle from "@/components/layout/SubTitle";
import { DatePicker, Select, Space } from "antd";
import {
  AddCompetitionRequestType,
  DivisionType,
  PlaceType,
} from "@/types/competitionType";
import {
  FetchAddCompetitionInfo,
  FetchGetDivisionList,
} from "@/services/competitionApi";
import { useQuery } from "@tanstack/react-query";
import AddPlace from "@/containers/jejuCompetition/detail/AddPlace";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/common/AddBtn";
import dayjs from "dayjs";
import { getNowDateToString } from "@/utils/FormDate";
import { koreanLocale } from "@/constants";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});

const AddCompetitionInfo = () => {
  const [title, setTitle] = useState<string>("");
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>(getNowDateToString());
  const [endDate, setEndDate] = useState<string>(getNowDateToString());
  const [participationStartDate, setParticipationStartDate] = useState<
    string | null
  >(null);
  const [participationEndDate, setParticipationEndDate] = useState<
    string | null
  >(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [relatedURL, setRelatedUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [ckData, setCkData] = useState<string>("");
  const [newCkImgUrls, setNewCkImgUrls] = useState<GetFileType[]>([]);
  const [divisionList, setDivisionList] = useState<DivisionType[]>([]);

  const router = useRouter();
  const { data: divisionData } = useQuery({
    queryKey: ["getDivisionList"],
    queryFn: () => FetchGetDivisionList(),
    select: (result) => result?.data.data,
    gcTime: 1000 * 60 * 60,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const formSubmitHandler = async () => {
    const requestData: AddCompetitionRequestType = {
      title: title,
      divisions: selectedDivisions,
      startDate: startDate,
      endDate: endDate,
      participationStartDate: participationStartDate,
      participationEndDate: participationEndDate,
      places: places,
      relatedURL: relatedURL,
      ckData: ckData,
      ckImgRequests: [],
    };

    for (let i: number = 0; i < newCkImgUrls.length; i++) {
      if (ckData.includes(newCkImgUrls[i].fileUrl)) {
        requestData.ckImgRequests.push(newCkImgUrls[i]);
      }
    }
    await confirmAndCancelAlertWithLoading(
      "question",
      "대회를 등록하시겠습니까?",
      "",
      async () => {
        await FetchAddCompetitionInfo(requestData, files);
      },
    );
  };

  useEffect(() => {
    const list: DivisionType[] = divisionData?.map((division: string) => {
      return { label: division, value: division };
    });
    setDivisionList(list);
  }, [divisionData]);
  return (
    <div className={"flex flex-col mt-5 w-[90%] md:w-[800px]"}>
      <SubTitle title={"대회정보 등록"} />
      <div className={"my-5"}>
        <PostInput
          type={"text"}
          placeHolder={"제목을 입력해주세요"}
          data={title}
          setData={setTitle}
        />
      </div>
      <Space style={{ width: "100%" }} direction="vertical">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="종별을 입력해주세요"
          onChange={(e: string[]) => setSelectedDivisions(e)}
          options={divisionList}
        />
        <div className={"pl-2 mt-4"}>
          <label className={"text-sm md:text-lg"}>● 대회 일정</label>
        </div>
        <div className={"flex"}>
          <DatePicker
            placeholder={"시작일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" && setStartDate(dateString)
            }
            locale={koreanLocale}
            value={dayjs(startDate)}
          />
          <DatePicker
            placeholder={"종료일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" && setEndDate(dateString)
            }
            locale={koreanLocale}
            value={dayjs(endDate)}
          />
        </div>
        <div className={"pl-2 mt-4"}>
          <label className={"text-sm md:text-lg"}>● 참가 기간</label>
        </div>
        <div className={"flex"}>
          <DatePicker
            placeholder={"시작일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" &&
              setParticipationStartDate(dateString)
            }
            locale={koreanLocale}
            value={
              participationStartDate ? dayjs(participationStartDate) : null
            }
          />
          <DatePicker
            placeholder={"종료일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" &&
              setParticipationEndDate(dateString)
            }
            locale={koreanLocale}
            value={participationEndDate ? dayjs(participationEndDate) : null}
          />
        </div>
      </Space>
      <AddPlace places={places} setPlaces={setPlaces} />
      <PostInput
        type={"text"}
        placeHolder={"관련 URL을 입력해주세요."}
        data={relatedURL ? relatedURL : ""}
        setData={setRelatedUrl}
      />
      <AddAttachedFileBox files={files} setFiles={setFiles} />
      <DynamicCkEditor
        ckData={ckData}
        setCkData={setCkData}
        setNewCkImgUrls={setNewCkImgUrls}
      />
      <div className={"grid grid-cols-2 gap-[10px] md:gap-[20px] my-[20px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => formSubmitHandler()} />
      </div>
    </div>
  );
};

export default AddCompetitionInfo;
