"use client";
import React, { useState } from "react";
import PageTitle from "@/components/layout/PageTitle";
import PostLabel from "@/components/common/PostLabel";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchUpdatePassword } from "@/services/user/UserApi";

const UpdatePassword = () => {
  const [prevPW, setPrevPW] = useState<string>("");
  const [newPW, setNewPW] = useState<string>("");
  const [newPWConfirm, setNewPWConfirm] = useState<string>("");
  const router = useRouter();

  const updateHandler = async () => {
    await confirmAndCancelAlertWithLoading(
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
        <button
          onClick={() => updateHandler()}
          type={"submit"}
          className={
            "font-bold rounded-[8px] bg-black text-white " +
            "text-[12px] sm:text-[14px] md:text-[18px] " +
            "w-[135px] sm:w-[195px] md:w-[390px] " +
            "h-[30px] sm:h-[30px] md:h-[50px]"
          }
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
