"use client";
import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { postCategoryOption } from "@/constants/post";
import PostInput from "@/components/common/PostInput";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FetchGetPostDetail, FetchUpdatePost } from "@/services/PostApi";
import { usePostStore } from "@/states/PostStore";
import dynamic from "next/dynamic";
import PostTitle from "@/components/common/PostTitle";
import { IoClose } from "react-icons/io5";
import { GetFileWithFileIdType } from "@/types/postType";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import SubTitle from "@/components/layout/SubTitle";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});

const UpdatePost = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [isOfficial, setIsOfficial] = useState<string>("false");
  const { postCategory, setPostCategory } = usePostStore();
  const [content, setContent] = useState<string>("");
  const [postImgs, setPostImgs] = useState<GetFileWithFileIdType[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [remainingFiles, setRemainingFiles] = useState<GetFileWithFileIdType[]>(
    [],
  );
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["getPostDetail", id],
    queryFn: async () => await FetchGetPostDetail(id, postCategory),
    select: (result) => result.data,
  });

  const deleteRemainingFile = (remainingUrl: string) => {
    setRemainingFiles((prevState) => {
      const prev = [...prevState];
      return prev.filter((item) => item.fileUrl !== remainingUrl);
    });
  };

  const updateHandler = async () => {
    const body = { title, content, postImgs, remainingFiles };
    await confirmAndCancelAlertWithLoading(
      "question",
      "게시물을 수정하겠습니까?",
      "",
      async () =>
        await FetchUpdatePost(id, postCategory, body, files, isOfficial),
    );
  };

  useEffect(() => {
    setTitle(data?.title);
    setIsOfficial(String(data?.isAnnouncement));
    setContent(data?.content);
    setPostImgs(data?.postImgs);
    setRemainingFiles(data?.files);
  }, [data]);

  return (
    <div className={"flex flex-col w-[90%] md:w-[800px]"}>
      <SubTitle title={"게시글 수정"} />
      <Space
        style={{ width: "100%", marginTop: "1.25rem" }}
        direction="vertical"
      >
        <div className={"flex"}>
          <Select
            allowClear
            style={{ width: "50%" }}
            placeholder="카테고리를 입력해주세요"
            onChange={(e: string) => setPostCategory(e)}
            options={postCategoryOption}
            value={postCategory}
          />
          <Select
            allowClear
            style={{ width: "50%" }}
            placeholder="공지여부"
            onChange={(e: string) => setIsOfficial(e)}
            options={[
              { value: "false", label: "미공지" },
              { value: "true", label: "공지" },
            ]}
            value={isOfficial}
          />
        </div>
      </Space>
      <div className={"my-5"}>
        <PostInput
          type={"text"}
          placeHolder={"제목을 입력해주세요"}
          data={title}
          setData={setTitle}
        />
      </div>
      <DynamicCkEditor
        ckData={content}
        setCkData={setContent}
        setNewCkImgUrls={setPostImgs}
      />
      <AddAttachedFileBox files={files} setFiles={setFiles} />
      {remainingFiles?.length !== 0 && (
        <div>
          <PostTitle title={"기존 파일"} />
          <ul
            className={
              "flex flex-col bg-white rounded-lg border " +
              "border-solid border-borderColor shadow-xl " +
              "text-sm sm:text-base md:text-lg " +
              "p-2.5 md:p-5"
            }
          >
            {remainingFiles?.map((file: GetFileWithFileIdType) => {
              return (
                <li key={file.fileId}>
                  <div className={"flex items-center"}>
                    <p className={"mr-1.5"}>{file.fileName}</p>
                    <IoClose
                      className={"text-lg cursor-pointer"}
                      onClick={() => deleteRemainingFile(file.fileUrl)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={"my-5 grid grid-cols-2 gap-2.5 md:gap-5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdatePost;
