"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getVideoId } from "@/constants/Video";
import { getVideoType } from "@/types/VideoType";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { useRouter } from "next/navigation";
import { FetchDeleteVideo } from "@/services/VideoApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useSession } from "next-auth/react";

type Props = {
  data: getVideoType;
};
const VideoListCard = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const deleteHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "영상을 삭제하시겠습니까?",
      "",
      async () => await FetchDeleteVideo(data.videoId.toString()),
    );
  };

  const updateHandler = () => {
    router.push(`/media/video/update/${data.videoId}`);
  };

  return (
    <div className={"w-full mb-[30px] md:mb-[50px] relative"}>
      <div
        className={
          "flex justify-between items-center absolute top-0 left-0 w-full z-30 " +
          "px-[5px] md:px-[10px] " +
          "pt-[3px] md:pt-[7px]"
        }
      >
        <h3 className={"text-[9px] sm:text-[11px] md:text-[16px] text-white"}>
          {data.title}
        </h3>
        {status === "authenticated" ? (
          <IoMenu
            className={
              "text-[15px] sm:text-[20px] md:text-[30px] cursor-pointer text-white"
            }
            onClick={() => setModalOpen(true)}
          />
        ) : (
          ""
        )}
      </div>
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
      <UpdateDeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteHandler={() => deleteHandler()}
        updateHandler={() => updateHandler()}
      />
    </div>
  );
};

export default VideoListCard;
