"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import PostInput from "@/components/common/PostInput";
import PostLabel from "@/components/common/PostLabel";
import { useQuery } from "@tanstack/react-query";
import { FetchGetUserInfo, FetchUpdateUserInfo } from "@/services/user/UserApi";
import { useRouter } from "next/navigation";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useSession } from "next-auth/react";
import Category from "@/components/layout/Category";

const UpdateUserInfo = () => {
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => await FetchGetUserInfo(),
    select: (result) => result?.data.data,
    enabled: sessionStatus === "authenticated",
  });

  const updateHandler = async () => {
    const request: {
      name: string;
      phoneNum: string;
    } = { name, phoneNum };
    await confirmAndCancelAlertWithLoading(
      "question",
      "프로필을 변경하겠습니까?",
      "",
      async () => FetchUpdateUserInfo(request),
    );
  };

  useEffect(() => {
    setName(data?.name);
    setPhoneNum(data?.phoneNum);
  }, [data]);

  return (
    <div className={"w-full flex flex-col items-center"}>
      <Category
        category1={"프로필 편집"}
        category1Url={"update"}
        defaultUrl={"/user/my-page/"}
      />
      <div className={"w-[90%] md:w-[800px] flex flex-col my-5 "}>
        <PostLabel content={"이름"} />
        <PostInput
          type={"text"}
          placeHolder={""}
          data={name}
          setData={setName}
        />
      </div>
      <div className={"w-[90%] md:w-[800px] flex flex-col mb-5"}>
        <PostLabel content={"휴대폰번호"} />
        <PostInput
          type={"text"}
          placeHolder={"예) 010-1234-5678"}
          data={phoneNum}
          setData={setPhoneNum}
        />
      </div>
      <div className={"w-[90%] md:w-[800px] grid grid-cols-2 gap-2.5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} text={"수정"} />
      </div>
    </div>
  );
};

export default UpdateUserInfo;
