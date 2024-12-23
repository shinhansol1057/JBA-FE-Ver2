import React, { useState } from "react";
import Image from "next/image";
import { GetGalleryType } from "@/types/galleryType";
import { IoMenu } from "react-icons/io5";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { useRouter } from "next/navigation";
import { FetchDeleteGallery } from "@/services/galleryApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { useSession } from "next-auth/react";

const GalleryCard = ({ data }: { data: GetGalleryType }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const updateHandler = () => {
    router.push(`/media/gallery/update/${data.galleryId}`);
  };
  const deleteHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "갤러리를 삭제하겠습니까?",
      "",
      async () => await FetchDeleteGallery(String(data.galleryId)),
    );
  };

  return (
    <div
      className={
        "h-[180px] sm:h-[220px] md:h-[390px] " +
        "rounded-lg overflow-hidden relative cursor-pointer"
      }
    >
      {status === "authenticated" ? (
        <IoMenu
          className={
            "text-white text-xl sm:text-3xl md:text-4xl cursor-pointer absolute top-1.5 right-1.5 z-20"
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
          "min-h-12 sm:min-h-14 md:min-h-20 " +
          "text-xs sm:text-sm md:text-base " +
          "px-2.5 sm:px-4 md:px-5 " +
          "py-2 sm:py-3 md:py-4 "
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
