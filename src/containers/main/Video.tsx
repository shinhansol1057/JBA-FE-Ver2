import React from "react";
import { FetchGetVideoList } from "@/services/VideoApi";
import VideoListCard from "@/containers/video/VideoListCard";
import { getVideoType } from "@/types/VideoType";
import AreaTitleAndAllContentBtn from "@/containers/main/AreaTitleAndAllContentBtn";

const Video = async () => {
  const FetchMainVideoList = async () => {
    const url =
      process.env.NEXT_PUBLIC_API_KEY +
      `/v1/api/video/get/videoList?size=3&keyword=&page=0&isOfficial=false`;
    const res = await fetch(url);
    return res.json();
  };
  const data = await FetchMainVideoList();

  return (
    <div
      className={
        "flex flex-col items-center w-[280px] sm:w-[400px] md:w-[600px] mt-[50px] md:mt-[80px]"
      }
    >
      <AreaTitleAndAllContentBtn title={"대회영상"} url={"/media/video"} />
      {data?.data.content.map((video: getVideoType) => {
        return <VideoListCard data={video} key={video.videoId} />;
      })}
    </div>
  );
};

export default Video;
