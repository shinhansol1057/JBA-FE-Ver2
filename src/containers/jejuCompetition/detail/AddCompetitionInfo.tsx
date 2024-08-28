"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getFileType } from "@/types/CommonType";
import PostInput from "@/components/common/PostInput";
import SubTitle from "@/components/layout/SubTitle";
import { DatePicker, Select, Space } from "antd";
import {
  AddCompetitionRequestType,
  divisionType,
  placeType,
} from "@/types/CompetitionType";
import { addCompetitionInfo, getDivisionList } from "@/services/CompetitionApi";
import { useQuery } from "@tanstack/react-query";
import AddPlace from "@/containers/jejuCompetition/detail/AddPlace";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/common/AddBtn";
import { koreanLocale } from "@/constants/AntdConfig";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});

const AddCompetitionInfo = () => {
  useAxiosInterceptor();
  const [title, setTitle] = useState<string>("");
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | string[]>("");
  const [endDate, setEndDate] = useState<string | string[]>("");
  const [places, setPlaces] = useState<placeType[]>([]);
  const [relatedURL, setRelatedUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [ckData, setCkData] = useState<string>("");
  const [newCkImgUrls, setNewCkImgUrls] = useState<getFileType[]>([]);
  const [divisionList, setDivisionList] = useState<divisionType[]>([]);

  const router = useRouter();

  const { data: divisionData } = useQuery({
    queryKey: ["getDivisionList"],
    queryFn: () => getDivisionList(),
    select: (result) => result?.data.data,
    gcTime: 1000 * 60 * 60,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  const handleDivisionChange = (e: string[]) => {
    setSelectedDivisions(e);
  };
  const formSubmitHandler = () => {
    // event.preventDefault();
    const requestData: AddCompetitionRequestType = {
      title: title,
      divisions: selectedDivisions,
      startDate: startDate,
      endDate: endDate,
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
    confirmAndCancelAlertWithLoading(
      "question",
      "대회를 등록하시겠습니까?",
      "",
      async () => {
        await addCompetitionInfo(requestData, files);
      },
    );
  };

  useEffect(() => {
    const list: divisionType[] = divisionData?.map((division: string) => {
      return { label: division, value: division };
    });
    setDivisionList(list);
  }, [divisionData]);
  return (
    <div
      className={"flex flex-col mt-[20px] w-[280px] sm:w-[400px] md:w-[800px]"}
    >
      <SubTitle title={"대회정보 등록"} />
      <div className={"my-[20px]"}>
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
          onChange={(e: string[]) => handleDivisionChange(e)}
          options={divisionList}
        />
        <div className={"flex"}>
          <DatePicker
            placeholder={"시작일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) => setStartDate(dateString)}
            locale={koreanLocale}
          />
          <DatePicker
            placeholder={"종료일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) => setEndDate(dateString)}
            locale={koreanLocale}
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
