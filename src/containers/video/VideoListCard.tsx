import React from "react";
import Image from "next/image";
import { getVideoId } from "@/constants/Video";
import { getVideoType } from "@/types/VideoType";
import PostLabel from "@/components/common/PostLabel";
import { useRouter } from "next/navigation";
import { BsFillPlayBtnFill, BsPlayBtnFill } from "react-icons/bs";

type Props = {
  data: getVideoType;
};
const VideoListCard = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div
      className={"w-[280px] sm:w-[400px] md:w-[800px] mb-[30px] md:mb-[50px]"}
    >
      <PostLabel content={data.title} />
      <div className={"relative"}>
        <Image
          src={`https://img.youtube.com/vi/${getVideoId(data.url)}/hqdefault.jpg`}
          alt={data.title}
          width={1000}
          height={1000}
          className={
            "w-full h-[150px] sm:h-[200px] md:h-[400px] cursor-pointer shadow-xl rounded-[8px]"
          }
        />
        <div
          className={
            "w-full h-full hover:bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 rounded-[8px] cursor-pointer z-20"
          }
          onClick={() => window.open(data.url, "_blank")}
        ></div>
        <BsFillPlayBtnFill
          className={
            "absolute top-[43%] left-[43%] text-[30px] sm:text-[40px] md:text-[70px] z-10 text-white "
          }
        />
      </div>
    </div>
  );
};

export default VideoListCard;
