"use client";
import React from "react";
import { Props } from "next/script";
import { gallery } from "@/types/MainPageType";
import Image from "next/image";

type Props = {
  data: gallery;
};
const GalleryCarouselCard = ({ data }: Props) => {
  return (
    <div
      className={
        "relative rounded-[8px] overflow-hidden " +
        "w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px]"
      }
    >
      <Image
        src={data?.imgUrl}
        alt={data?.title}
        width={500}
        height={500}
        className={
          "absolute top-0 left-0 bg-cover bg-center object-cover rounded-[inherit] " +
          "w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px]"
        }
      />
      <div
        className={
          "w-full h-[55px] sm:h-[70px] md:h-[100px] bg-[rgba(0,0,0,0.6)] absolute bottom-0 left-0 flex flex-col justify-around py-[10px] pl-[20px] text-[10px] sm:text-[16px] md:text-[24px] text-white"
        }
      >
        <h1>{data?.title}</h1>
        <p>{data?.createAt}</p>
      </div>
    </div>
  );
};

export default GalleryCarouselCard;
