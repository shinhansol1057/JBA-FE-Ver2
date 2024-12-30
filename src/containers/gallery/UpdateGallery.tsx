"use client";
import React, { useEffect, useState } from "react";
import SubTitle from "@/components/layout/SubTitle";
import PostInput from "@/components/common/PostInput";
import AddGalleryAttachedFileBox from "@/containers/gallery/AddGalleryAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { GetFileType } from "@/types/commonType";
import { useRouter } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import {
  FetchGetGalleryDetail,
  FetchUpdateGallery,
} from "@/services/galleryApi";
import { useQuery } from "@tanstack/react-query";
import { GetFileWithFileIdType } from "@/types/postType";
import PostTitle from "@/components/common/PostTitle";
import { IoClose } from "react-icons/io5";

const UpdateGallery = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<GetFileType[]>([]);
  const [remainingFiles, setRemainingFiles] = useState<GetFileType[]>([]);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["getGalleryDetail"],
    queryFn: async () => await FetchGetGalleryDetail(id),
    select: (result) => result?.data,
  });

  const updateGalleryHandler = async () => {
    let fileList: GetFileType[] = [];
    remainingFiles.forEach((file: GetFileType) => fileList.push(file));
    files.forEach((file: GetFileType) => fileList.push(file));

    await confirmAndCancelAlertWithLoading(
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
      data?.files.map((file: GetFileWithFileIdType) => {
        return { fileName: file.fileName, fileUrl: file.fileUrl };
      }),
    );
  }, [data]);

  return (
    <div className={"w-[90%] md:w-[800px]"}>
      <div className={"my-5"}>
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
              "flex flex-col bg-white rounded-lg border border-solid border-borderColor shadow-xl " +
              "text-sm sm:text-base md:text-lg " +
              "p-2.5 md:p-5"
            }
          >
            {remainingFiles?.map((file: GetFileWithFileIdType, i: number) => {
              return (
                <li key={file.fileId + "/" + i}>
                  <div className={"flex items-center "}>
                    <p className={"mr-1.5"}>{file.fileName}</p>
                    <IoClose
                      className={
                        "ftext-lg sm:text-xl md:text-2xl cursor-pointer"
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
