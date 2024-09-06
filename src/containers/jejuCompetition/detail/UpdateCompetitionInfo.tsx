"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FetchUpdateCompetitionInfo,
  FetchGetCompetitionDetail,
  FetchGetDivisionList,
} from "@/services/CompetitionApi";
import {
  competitionDetailAttachedFileType,
  divisionType,
  placeType,
  updateCompetitionRequestType,
} from "@/types/CompetitionType";
import { getFileType } from "@/types/CommonType";
import SubTitle from "@/components/layout/SubTitle";
import PostInput from "@/components/common/PostInput";
import { DatePicker, Select, Space } from "antd";
import { koreanLocale } from "@/constants/AntdConfig";
import AddPlace from "@/containers/jejuCompetition/detail/AddPlace";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import dynamic from "next/dynamic";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import UpdateAttachedFileBox from "@/containers/jejuCompetition/detail/UpdateAttachedFileBox";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});
const UpdateCompetitionInfo = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [places, setPlaces] = useState<placeType[]>([]);
  const [relatedURL, setRelatedUrl] = useState<string | null>("");
  const [files, setFiles] = useState<File[]>([]);
  const [ckData, setCkData] = useState<string>("");
  const [attachedFileList, setAttachedFileList] = useState<
    competitionDetailAttachedFileType[]
  >([]);
  const [newCkImgUrls, setNewCkImgUrls] = useState<getFileType[]>([]);
  const [divisionList, setDivisionList] = useState<divisionType[]>([]);

  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getCompetitionDetail", id],
    queryFn: () => FetchGetCompetitionDetail(id),
    select: (result) => result?.data.data,
    gcTime: 1000 * 60 * 10,
  });

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

  const formSubmitHandler = () => {
    const requestData: updateCompetitionRequestType = {
      title: title,
      divisions: selectedDivisions,
      startDate: startDate,
      endDate: endDate,
      updatePlaces: places,
      relatedURL: relatedURL,
      ckData: ckData,
      ckImgRequests: [],
      uploadedAttachedFiles: attachedFileList.map((item) => item.filePath),
      deletedCkImgUrls: [],
    };

    // 기존 ck이미지에서 삭제된 이미지 추출 -> 백엔드에서 삭제된 이미지는 DB데이터 삭제 및 버킷 파일 삭제 요청
    for (let i: number = 0; i < data.ckImgUrls.length; i++) {
      if (!ckData.includes(data.ckImgUrls[i])) {
        requestData.deletedCkImgUrls.push(data.ckImgUrls[i]);
      }
    }
    // 새로운 ck 이미지
    for (let i: number = 0; i < newCkImgUrls.length; i++) {
      if (ckData.includes(newCkImgUrls[i].fileUrl)) {
        requestData.ckImgRequests.push(newCkImgUrls[i]);
      }
    }
    confirmAndCancelAlertWithLoading(
      "question",
      "대회를 수정하시겠습니까?",
      "",
      async () => {
        if (id) await FetchUpdateCompetitionInfo(id, requestData, files);
      },
    );
  };

  useEffect(() => {
    setTitle(data?.title);
    setSelectedDivisions(data?.divisions);
    setStartDate(data?.startDate);
    setEndDate(data?.endDate);
    setPlaces(data?.places);
    setRelatedUrl(data?.relatedUrl);
    setCkData(data?.content);
    setAttachedFileList(data?.competitionDetailAttachedFiles);
  }, [data]);

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
          data={title || ""}
          setData={setTitle}
        />
      </div>
      <Space style={{ width: "100%" }} direction="vertical">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="종별을 입력해주세요"
          onChange={(values: string[]) => setSelectedDivisions(values)}
          options={divisionList}
          value={selectedDivisions}
        />
        <div className={"flex"}>
          <DatePicker
            placeholder={"시작일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" && setStartDate(dateString)
            }
            locale={koreanLocale}
            value={
              dayjs(startDate) || dayjs(data?.startDate.toString().slice(0, 10))
            }
          />
          <DatePicker
            placeholder={"종료일을 입력해주세요"}
            style={{ width: "50%" }}
            onChange={(date, dateString) =>
              typeof dateString === "string" && setEndDate(dateString)
            }
            locale={koreanLocale}
            value={
              dayjs(endDate) || dayjs(data?.endDate.toString().slice(0, 10))
            }
          />
        </div>
      </Space>
      <AddPlace places={places} setPlaces={setPlaces} />
      <PostInput
        type={"text"}
        placeHolder={"관련 URL을 입력해주세요."}
        data={relatedURL || ""}
        setData={setRelatedUrl}
      />
      <UpdateAttachedFileBox
        files={files}
        setFiles={setFiles}
        attachedFileList={attachedFileList}
        setAttachedFileList={setAttachedFileList}
      />
      <DynamicCkEditor
        ckData={ckData || ""}
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

export default UpdateCompetitionInfo;
