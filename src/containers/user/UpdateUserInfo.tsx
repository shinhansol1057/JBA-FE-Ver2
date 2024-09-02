"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import PostInput from "@/components/common/PostInput";
import PostLabel from "@/components/common/PostLabel";
import { useQuery } from "@tanstack/react-query";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";
import { FetchGetUserInfo, FetchUpdateUserInfo } from "@/services/user/UserApi";
import { useRouter } from "next/navigation";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";

const UpdateUserInfo = () => {
  useAxiosInterceptor();
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => await FetchGetUserInfo(),
    select: (result) => result?.data.data,
  });

  const updateHandler = () => {
    const request: {
      name: string;
      phoneNum: string;
      birth: string;
      team: string;
    } = { name, phoneNum, birth, team };
    confirmAndCancelAlertWithLoading(
      "question",
      "프로필을 변경하겠습니까?",
      "",
      async () => FetchUpdateUserInfo(request),
    );
  };

  useEffect(() => {
    let birthOf7th;
    if (data?.birth.substring(0, 1) === "0" && data?.gender === "MALE") {
      birthOf7th = "3";
    } else if (
      data?.birth.substring(0, 1) === "0" &&
      data?.gender === "FEMALE"
    ) {
      birthOf7th = "4";
    } else if (data?.birth.substring(0, 1) !== "0" && data?.gender === "MALE") {
      birthOf7th = "1";
    } else {
      birthOf7th = "2";
    }
    setName(data?.name);
    setPhoneNum(data?.phoneNum);
    setBirth(data?.birth + "-" + birthOf7th);
    setTeam(data?.team);
  }, [data]);

  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"프로필 편집"} url={"/user/my-page/update"} />
      <div className={"flex flex-col my-[20px]"}>
        <PostLabel content={"이름"} />
        <PostInput
          type={"text"}
          placeHolder={""}
          data={name}
          setData={setName}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"휴대폰번호"} />
        <PostInput
          type={"text"}
          placeHolder={"예) 010-1234-5678"}
          data={phoneNum}
          setData={setPhoneNum}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"생년월일 앞 7자리"} />
        <PostInput
          type={"text"}
          placeHolder={"예) 991231-1"}
          data={birth}
          setData={setBirth}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"소속팀"} />
        <PostInput
          type={"text"}
          placeHolder={"예) 소속팀이 없을경우 '무소속'"}
          data={team}
          setData={setTeam}
        />
      </div>
      <div className={"grid grid-cols-2 gap-[10px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdateUserInfo;
