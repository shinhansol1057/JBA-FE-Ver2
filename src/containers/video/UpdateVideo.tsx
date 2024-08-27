"use client";
import React, { useEffect, useState } from "react";
import PostLabel from "@/components/common/PostLabel";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { addVideo, getVideo, updateVideo } from "@/services/VideoApi";
import { useRouter } from "next/navigation";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import SubTitle from "@/components/layout/SubTitle";

const UpdateVideo = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  useAxiosInterceptor();

  const updateHandler = () => {
    const data = { videoId: id, title: title, url: url, content: content };
    updateVideo(data);
  };

  const { data: lastData } = useQuery({
    queryKey: ["getVideo", id],
    queryFn: () => getVideo(id),
    select: (result) => result.data.data,
  });

  useEffect(() => {
    if (lastData) {
      setTitle(lastData.title);
      setUrl(lastData.url);
      setContent(lastData.content);
    }
  }, [lastData]);

  return (
    <div className={"mt-[20px]"}>
      <SubTitle title={"대회영상 수정"} />
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
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdateVideo;
