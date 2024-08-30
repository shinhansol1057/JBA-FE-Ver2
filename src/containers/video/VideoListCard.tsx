import React, { useState } from "react";
import Image from "next/image";
import { getVideoId } from "@/constants/Video";
import { getVideoType } from "@/types/VideoType";
import PostLabel from "@/components/common/PostLabel";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { useRouter } from "next/navigation";
import { deleteVideo } from "@/services/VideoApi";
import { FindAdminRole } from "@/utils/JwtDecoder";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";

type Props = {
  data: getVideoType;
};
const VideoListCard = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const deleteHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "영상을 삭제하시겠습니까?",
      "",
      async () => await deleteVideo(data.videoId.toString()),
    );
  };

  const updateHandler = () => {
    router.push(`/media/video/updateVideo/${data.videoId}`);
  };

  return (
    <div
      className={"w-[280px] sm:w-[400px] md:w-[800px] mb-[30px] md:mb-[50px]"}
    >
      <div className={"flex justify-between items-center"}>
        <PostLabel content={data.title} />
        {FindAdminRole() ? (
          <IoMenu
            className={
              "text-[20px] sm:text-[25px] md:text-[35px] cursor-pointer"
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
