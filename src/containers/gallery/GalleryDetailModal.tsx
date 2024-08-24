import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { getGalleryDetail } from "@/types/GalleryType";
import { handleDownload } from "@/utils/HandleDownload";
type Props = {
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  data: getGalleryDetail;
};
const GalleryDetailModal = ({ setModalOpen, data }: Props) => {
  return (
    <div>
      <div
        className={
          "text-[#EEEEEE] bg-[rgba(0,0,0,0.8)] flex justify-between items-center px-[20px] " +
          "h-[30px] sm:h-[40px] md:h-[50px]"
        }
      >
        <AiOutlineDownload
          className={"cursor-pointer text-[15px] sm:text-[20px] md:text-[30px]"}
          onClick={() => handleDownload(data.fileUrl, data.fileName)}
        />
        <IoClose
          className={"cursor-pointer text-[15px] sm:text-[20px] md:text-[30px]"}
          onClick={() => setModalOpen(false)}
        />
      </div>
      <Image
        src={data.fileUrl}
        alt={data.fileName}
        width={1000}
        height={1000}
        className={" w-full object-cover"}
      />
    </div>
  );
};

export default GalleryDetailModal;
