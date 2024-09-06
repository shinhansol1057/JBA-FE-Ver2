"use client";
import React, { useState } from "react";
import AddGalleryAttachedFileBox from "@/containers/gallery/AddGalleryAttachedFileBox";
import { getFileType } from "@/types/CommonType";
import SubTitle from "@/components/layout/SubTitle";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchAddGallery } from "@/services/GalleryApi";

const AddGallery = () => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<getFileType[]>([]);
  const router = useRouter();

  const addGalleryHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "갤러리를 등록하겠습니까?",
      "",
      async () => await FetchAddGallery(title, files, false),
    );
  };

  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      <div className={"my-[20px]"}>
        <SubTitle title={"갤러리 등록"} />
      </div>
      <PostInput
        type={"text"}
        placeHolder={"제목을 입력해주세요"}
        data={title}
        setData={setTitle}
      />
      <AddGalleryAttachedFileBox files={files} setFiles={setFiles} />
      <div className={"grid grid-cols-2 gap-[10px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => addGalleryHandler()} />
      </div>
    </div>
  );
};

export default AddGallery;
