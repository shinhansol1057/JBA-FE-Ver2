"use client";
import React, { useState } from "react";
import PostInput from "@/components/common/PostInput";
import PostLabel from "@/components/common/PostLabel";
import AddBtn from "@/components/common/AddBtn";
import CancelBtn from "@/components/common/CancelBtn";
import { addVideo } from "@/services/VideoApi";
import { useRouter } from "next/navigation";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";
import SubTitle from "@/components/layout/SubTitle";

const AddVideo = () => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  useAxiosInterceptor();

  return (
    <div className={"mt-[20px]"}>
      <SubTitle title={"대회영상 등록"} />
      <div className={"flex flex-col my-[20px]"}>
        <PostLabel content={"title"} />
        <PostInput
          type={"text"}
          placeHolder={"제목을 입력해주세요."}
          data={title}
          setData={setTitle}
        />
      </div>
      <div className={"flex flex-col mb-[20px]"}>
        <PostLabel content={"url"} />
        <PostInput
          type={"text"}
          placeHolder={"youtube url을 입력해주세요."}
          data={url}
          setData={setUrl}
        />
      </div>
      <div className={"flex flex-col mb-[20px] "}>
        <PostLabel content={"content"} />
        <PostInput
          type={"text"}
          placeHolder={"짧은 설명을 입력해주세요."}
          data={content}
          setData={setContent}
        />
      </div>
      <div className={"grid grid-cols-2 gap-[10px]"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => addVideo(title, url, content, router)} />
      </div>
    </div>
  );
};

export default AddVideo;
