"use client";
import React, { useState } from "react";
import PostLabel from "@/components/common/PostLabel";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import Category from "@/components/layout/Category";
import AddBtn from "@/components/common/AddBtn";
import useUserMutation from "@/hooks/mutations/useUserMutation";

const UpdatePassword = () => {
  const [prevPW, setPrevPW] = useState<string>("");
  const [newPW, setNewPW] = useState<string>("");
  const [newPWConfirm, setNewPWConfirm] = useState<string>("");
  const router = useRouter();
  const mutation = useUserMutation();

  const updateHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "비밀번호 변경",
      "비밀번호를 변경하겠습니까?",
      async () =>
        mutation.updatePasswordMutation.mutate({ prevPW, newPW, newPWConfirm }),
    );
  };

  return (
    <div className={"flex flex-col items-center w-full "}>
      <Category
        category1={"비밀번호 변경"}
        category1Url={"password"}
        defaultUrl={"/user/my-page/update/"}
      />
      <div className={"w-[90%] md:w-[800px] flex flex-col my-5"}>
        <PostLabel content={"현재 비밀번호"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={prevPW}
          setData={setPrevPW}
        />
      </div>
      <div className={"w-[90%] md:w-[800px] flex flex-col mb-5"}>
        <PostLabel content={"새 비밀번호"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={newPW}
          setData={setNewPW}
        />
      </div>
      <div className={"w-[90%] md:w-[800px] flex flex-col mb-5"}>
        <PostLabel content={"새 비밀번호 확인"} />
        <PostInput
          type={"password"}
          placeHolder={""}
          data={newPWConfirm}
          setData={setNewPWConfirm}
        />
      </div>
      <div className={"w-[90%] md:w-[800px] grid grid-cols-2 gap-2.5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} text={"수정"} />
      </div>
    </div>
  );
};

export default UpdatePassword;
