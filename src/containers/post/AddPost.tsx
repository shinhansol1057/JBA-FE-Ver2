"use client";
import React, { useState } from "react";
import PostInput from "@/components/common/PostInput";
import { Select, Space } from "antd";
import { postCategoryOption } from "@/constants";
import dynamic from "next/dynamic";
import { GetFileType } from "@/types/commonType";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import { FetchAddPost } from "@/services/postApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { usePostStore } from "@/states/PostStore";
import SubTitle from "@/components/layout/SubTitle";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});
const AddPost = () => {
  const [title, setTitle] = useState<string>("");
  const [isOfficial, setIsOfficial] = useState<string>("false");
  const { postCategory, setPostCategory } = usePostStore();
  const [content, setContent] = useState<string>("");
  const [postImgs, setPostImgs] = useState<GetFileType[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const addHandler = async () => {
    const body = { title, content, postImgs };
    await confirmAndCancelAlertWithLoading(
      "question",
      "게시물을 등록하겠습니까?",
      "",
      async () => await FetchAddPost(postCategory, body, files, isOfficial),
    );
  };

  return (
    <div className={"flex flex-col w-[90%] md:w-[800px]"}>
      <SubTitle title={"게시글 등록"} />
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
      <div className={"grid grid-cols-2 gap-2.5 md:gap-5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => addHandler()} />
      </div>
    </div>
  );
};

export default AddPost;
