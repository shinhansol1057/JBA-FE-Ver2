"use client";
import React, { useEffect, useState } from "react";
import SubTitle from "@/components/layout/SubTitle";
import PostInput from "@/components/common/PostInput";
import AddGalleryAttachedFileBox from "@/containers/gallery/AddGalleryAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { getFileType } from "@/types/CommonType";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import {
  FetchGetGalleryDetail,
  FetchUpdateGallery,
} from "@/services/GalleryApi";
import { useQuery } from "@tanstack/react-query";
import { getFileWithFileIdType } from "@/types/PostType";
import PostTitle from "@/components/common/PostTitle";
import { IoClose } from "react-icons/io5";

const UpdateGallery = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<getFileType[]>([]);
  const [remainingFiles, setRemainingFiles] = useState<getFileType[]>([]);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["getGalleryDetail"],
    queryFn: async () => await FetchGetGalleryDetail(id),
    select: (result) => result?.data,
  });

  const updateGalleryHandler = () => {
    let fileList: getFileType[] = [];
    remainingFiles.forEach((file: getFileType) => fileList.push(file));
    files.forEach((file: getFileType) => fileList.push(file));

    confirmAndCancelAlertWithLoading(
      "question",
      "갤러리를 수정하겠습니까?",
      "",
      async () => await FetchUpdateGallery(id, title, fileList, false),
    );
  };

  const deleteRemainingFile = (remainingUrl: string) => {
    setRemainingFiles((prevState) => {
      const prev = [...prevState];
      return prev.filter((item) => item.fileUrl !== remainingUrl);
    });
  };

  useEffect(() => {
    setTitle(data?.title);
    setRemainingFiles(
      data?.files.map((file: getFileWithFileIdType) => {
        return { fileName: file.fileName, fileUrl: file.fileUrl };
      }),
    );
  }, [data]);

  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      <div className={"my-[20px]"}>
        <SubTitle title={"갤러리 수정"} />
      </div>
      <PostInput
        type={"text"}
        placeHolder={"제목을 입력해주세요"}
        data={title}
        setData={setTitle}
      />
      <AddGalleryAttachedFileBox files={files} setFiles={setFiles} />
      {remainingFiles?.length !== 0 ? (
        <div>
          <PostTitle title={"기존 파일"} />
          <ul
            className={
              "flex flex-col bg-white rounded-[8px] border border-solid border-borderColor shadow-xl " +
              "text-[10px] sm:text-[12px] md:text-[18px] " +
              "p-[10px] md:p-[20px]"
            }
          >
            {remainingFiles?.map((file: getFileWithFileIdType, i: number) => {
              return (
                <li key={file.fileId + "/" + i}>
                  <div className={"flex"}>
                    <p className={"mr-[5px]"}>{file.fileName}</p>
                    <IoClose
                      className={
                        "text-[12px] sm:text-[16px] md:text-[20px] cursor-pointer"
                      }
                      onClick={() => deleteRemainingFile(file.fileUrl)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      <div className={"grid grid-cols-2 gap-[10px] my-[20px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateGalleryHandler()} />
      </div>
    </div>
  );
};

export default UpdateGallery;
