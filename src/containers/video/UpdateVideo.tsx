"use client";
import React, { useEffect, useState } from "react";
import PostLabel from "@/components/common/PostLabel";
import PostInput from "@/components/common/PostInput";
import CancelBtn from "@/components/common/CancelBtn";
import AddBtn from "@/components/common/AddBtn";
import { FetchGetVideoDetail, updateVideo } from "@/services/VideoApi";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SubTitle from "@/components/layout/SubTitle";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";

const UpdateVideo = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const updateHandler = async () => {
    const data = { videoId: id, title: title, url: url, content: content };
    await confirmAndCancelAlertWithLoading(
      "question",
      "영상을 수정하겠습니까?",
      "",
      async () => await updateVideo(data),
    );
  };

  const { data: lastData } = useQuery({
    queryKey: ["getVideo", id],
    queryFn: () => FetchGetVideoDetail(id),
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
    <div className={"w-[90%] md:w-[800px] mt-5"}>
      <SubTitle title={"대회영상 수정"} />
      <div className={"flex flex-col my-5"}>
        <PostLabel content={"title"} />
        <PostInput
          type={"text"}
          placeHolder={"제목을 입력해주세요."}
          data={title}
          setData={setTitle}
        />
      </div>
      <div className={"flex flex-col mb-5"}>
        <PostLabel content={"url"} />
        <PostInput
          type={"text"}
          placeHolder={"youtube url을 입력해주세요."}
          data={url}
          setData={setUrl}
        />
      </div>
      <div className={"flex flex-col mb-5 "}>
        <PostLabel content={"content"} />
        <PostInput
          type={"text"}
          placeHolder={"짧은 설명을 입력해주세요."}
          data={content}
          setData={setContent}
        />
      </div>
      <div className={"grid grid-cols-2 gap-2.5"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => updateHandler()} />
      </div>
    </div>
  );
};

export default UpdateVideo;
