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
      <div className={"grid grid-cols-2 gap-[10px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdateUserInfo;
