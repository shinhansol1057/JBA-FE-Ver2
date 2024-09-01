import React, { useState } from "react";
import Image from "next/image";
import { getGalleryType } from "@/types/GalleryType";
import { IoMenu } from "react-icons/io5";
import { FindAdminRole } from "@/utils/JwtDecoder";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { useRouter } from "next/navigation";
import { FetchDeleteGallery } from "@/services/GalleryApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";

const GalleryCard = ({ data }: { data: getGalleryType }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const isAdmin = FindAdminRole();
  const router = useRouter();

  const updateHandler = () => {
    router.push(`/media/gallery/update/${data.galleryId}`);
  };
  const deleteHandler = () => {
    confirmAndCancelAlertWithLoading(
      "question",
      "갤러리를 삭제하겠습니까?",
      "",
      async () => await FetchDeleteGallery(String(data.galleryId)),
    );
  };

  return (
    <div
      className={
        "w-[135px] sm:w-[195px] md:w-[390px] " +
        "h-[135px] sm:h-[195px] md:h-[390px] " +
        "rounded-[8px] overflow-hidden relative cursor-pointer"
      }
    >
      {isAdmin ? (
        <IoMenu
          className={
            "text-[20px] sm:text-[25px] md:text-[35px] cursor-pointer absolute top-[5px] right-[5px] z-20"
          }
          onClick={() => setModalOpen(true)}
        />
      ) : (
        ""
      )}
      {data.fileName !== "갤러리 없는 갤러리 게시물" ? (
        <Image
          src={data.imgUrl}
          alt={data.title}
          width={500}
          height={500}
          className={"w-full h-full object-cover"}
        />
      ) : (
        ""
      )}
      <div
        className={
          "w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] z-10 "
        }
        onClick={() => router.push(`/media/gallery/${data.galleryId}`)}
      ></div>
      <div
        className={
          "absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.6)] " +
          "text-white flex flex-col justify-between z-10 " +
          "h-[40px] sm:h-[50px] md:h-[70px] " +
          "text-[7px] sm:text-[10px] md:text-[14px] " +
          "pl-[10px] sm:pl-[15px] md:pl-[20px] " +
          "py-[8px] sm:py-[12px] md:py-[15px] "
        }
        onClick={() => router.push(`/media/gallery/${data.galleryId}`)}
      >
        <h2>{data.title}</h2>
        <p>{data.createAt}</p>
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

export default GalleryCard;
