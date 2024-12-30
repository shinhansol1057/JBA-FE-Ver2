"use client";
import React, { useState } from "react";
import AddGalleryAttachedFileBox from "@/containers/gallery/AddGalleryAttachedFileBox";
import { GetFileType } from "@/types/commonType";
import SubTitle from "@/components/layout/SubTitle";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchAddGallery } from "@/services/galleryApi";

const AddGallery = () => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<GetFileType[]>([]);
  const router = useRouter();

  const addGalleryHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "갤러리를 등록하겠습니까?",
      "",
      async () => await FetchAddGallery(title, files, false),
    );
  };

  return (
    <div className={"w-[90%] md:w-[800px]"}>
      <div className={"my-5"}>
        <SubTitle title={"갤러리 등록"} />
      </div>
      <PostInput
        type={"text"}
        placeHolder={"제목을 입력해주세요"}
        data={title}
        setData={setTitle}
      />
      <AddGalleryAttachedFileBox files={files} setFiles={setFiles} />
      <div className={"grid grid-cols-2 gap-2.5 md:gap-5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => addGalleryHandler()} />
      </div>
    </div>
  );
};

export default AddGallery;
