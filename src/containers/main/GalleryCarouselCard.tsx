"use client";
import React from "react";
import { gallery } from "@/types/MainPageType";
import Image from "next/image";

type Props = {
  data: gallery;
  key: number;
};
const GalleryCarouselCard = ({ data, key }: Props) => {
  return (
    <div
      className={
        "relative rounded-[8px] overflow-hidden " +
        "w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px]"
      }
    >
      <div
        className={
          "bg-[rgba(0,0,0,0.2)] absolute top-0 left-0 w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px] z-10"
        }
      ></div>
      <Image
        src={data.imgUrl}
        alt={data.title}
        width={500}
        height={500}
        className={
          "absolute top-0 left-0 bg-cover bg-center object-cover rounded-[inherit] " +
          "w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px] "
        }
      />
      <div
        className={
          "w-full bg-[rgba(0,0,0,0.6)] absolute bottom-0 left-0 flex flex-col justify-around py-[10px] pl-[20px] text-white z-20 " +
          "text-[10px] sm:text-[16px] md:text-[24px] " +
          "h-[55px] sm:h-[70px] md:h-[100px]"
        }
      >
        <h1>{data?.title}</h1>
        <p>{data?.createAt}</p>
      </div>
    </div>
  );
};

export default GalleryCarouselCard;
