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
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  data: getVideoType;
};
const VideoListCard = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const isAdmin = useIsAdmin();

  const deleteHandler = async () => {
    await confirmAndCancelAlertWithLoading(
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
    <div className={"w-full mb-8 md:mb-12 relative"}>
      <div
        className={
          "flex justify-between items-center absolute top-0 left-0 w-full z-30 " +
          "px-1.5 md:px-2.5 " +
          "pt-1 md:pt-2"
        }
      >
        <h3 className={"text-sm sm:text-base md:text-2xl text-white"}>
          {data.title}
        </h3>
        {isAdmin && (
          <IoMenu
            className={
              "text-lg sm:text-xl md:text-3xl cursor-pointer text-white"
            }
            onClick={() => setModalOpen(true)}
          />
        )}
      </div>
      <div className={"relative"}>
        <Image
          src={`https://img.youtube.com/vi/${getVideoId(data.url)}/hqdefault.jpg`}
          alt={data.title}
          width={1000}
          height={1000}
          className={"cursor-pointer shadow-xl rounded-lg"}
        />
        <div
          className={
            "w-full h-full hover:bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 rounded-lg cursor-pointer z-20"
          }
          onClick={() => window.open(data.url, "_blank")}
        ></div>
        <BsFillPlayBtnFill
          className={
            "absolute top-[43%] left-[43%] text-3xl sm:text-5xl md:text-7xl z-10 text-white "
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
