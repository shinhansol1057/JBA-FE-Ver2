"use client";
import React, { useState } from "react";
import PostInput from "@/components/common/PostInput";
import { Select, Space } from "antd";
import { postCategoryOption } from "@/constants/Post";
import dynamic from "next/dynamic";
import { getFileType } from "@/types/CommonType";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import { FetchAddPost } from "@/services/PostApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";
import { usePostStore } from "@/states/PostStore";
import SubTitle from "@/components/layout/SubTitle";
import { useSession } from "next-auth/react";

const DynamicCkEditor = dynamic(() => import("@/libs/ckEditor/CkEditor"), {
  ssr: false,
});
const AddPost = () => {
  const [title, setTitle] = useState<string>("");
  const [isOfficial, setIsOfficial] = useState<string>("false");
  const { postCategory, setPostCategory } = usePostStore();
  const [content, setContent] = useState<string>("");
  const [postImgs, setPostImgs] = useState<getFileType[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const addHandler = () => {
    const body = { title, content, postImgs };
    confirmAndCancelAlertWithLoading(
      "question",
      "게시물을 등록하겠습니까?",
      "",
      async () =>
        await FetchAddPost(postCategory, body, files, isOfficial, session),
    );
  };

  return (
    <div className={"flex flex-col w-[280px] sm:w-[400px] md:w-[800px]"}>
      <SubTitle title={"게시글 등록"} />
      <Space style={{ width: "100%", marginTop: "20px" }} direction="vertical">
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
      <div className={"my-[20px]"}>
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
      <div>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => addHandler()} />
      </div>
    </div>
  );
};

export default AddPost;
