"use client";
import React, { useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import PostLabel from "@/components/common/PostLabel";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchUpdatePassword } from "@/services/user/UserApi";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";

const UpdatePassword = () => {
  useAxiosInterceptor();
  const [prevPW, setPrevPW] = useState<string>("");
  const [newPW, setNewPW] = useState<string>("");
  const [newPWConfirm, setNewPWConfirm] = useState<string>("");
  const router = useRouter();

  const updateHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "비밀번호를 변경하겠습니까?",
      "",
      async () => await FetchUpdatePassword(prevPW, newPW, newPWConfirm),
    );
  };

  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle
        title={"비밀번호 변경"}
        url={"/user/my-page/update/password"}
      />
      <div className={"flex flex-col my-[20px]"}>
        <PostLabel content={"현재 비밀번호"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={prevPW}
          setData={setPrevPW}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"새 비밀번호"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={newPW}
          setData={setNewPW}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"새 비밀번호 확인"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={newPWConfirm}
          setData={setNewPWConfirm}
        />
      </div>
      <div className={"grid grid-cols-2 gap-[10px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdatePassword;
