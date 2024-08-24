import React from "react";
import Image from "next/image";
import { getGallery } from "@/types/GalleryType";
import Link from "next/link";

const GalleryCard = ({ data }: { data: getGallery }) => {
  return (
    <Link
      className={
        "w-[135px] sm:w-[195px] md:w-[390px] " +
        "h-[135px] sm:h-[195px] md:h-[390px] " +
        "rounded-[8px] overflow-hidden relative cursor-pointer"
      }
      href={`/media/gallery/${data.galleryId}`}
    >
      <Image
        src={data.imgUrl}
        alt={data.title}
        width={500}
        height={500}
        className={"w-full h-full object-cover"}
      />
      <div
        className={
          "w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] z-10 "
        }
      ></div>
      <div
        className={
          "absolute bottom-0 left-0 w-full bg-[rgba(0,0,0,0.6)] " +
          "text-white flex flex-col justify-between z-20 " +
          "h-[40px] sm:h-[50px] md:h-[70px] " +
          "text-[7px] sm:text-[10px] md:text-[14px] " +
          "pl-[10px] sm:pl-[15px] md:pl-[20px] " +
          "py-[8px] sm:py-[12px] md:py-[15px] "
        }
      >
        <h2>{data.title}</h2>
        <p>{data.createAt}</p>
      </div>
    </Link>
  );
};

export default GalleryCard;
