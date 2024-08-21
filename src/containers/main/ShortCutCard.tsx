"use client";
import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  icon: string;
  alt: string;
  content: string;
  backgroundImageUrl: string;
  navUrl: string;
};
const ShortCutCard = ({
  title,
  icon,
  alt,
  content,
  backgroundImageUrl,
  navUrl,
}: Props) => {
  return (
    <Link
      className={
        "w-[135px] sm:w-[195px] md:w-[295px] h-[100px] sm:h-[130px] md:h-[160px] " +
        "cursor-pointer rounded-[8px] bg-cover bg-center relative grayscale-[100%] flex flex-col justify-between"
      }
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      href={navUrl}
    >
      <div
        className={
          "absolute top-0 left-0 bg-[rgba(0,0,0,0.78)] w-full h-full rounded-[8px]"
        }
      ></div>
      <div className={"flex justify-between mt-[10px] mx-[10px] grayscale-0"}>
        <h3
          className={
            "text-white text-[14px] sm:text-[18px] md:text-[24px] font-bold"
          }
        >
          {title}
        </h3>
        <img
          src={icon}
          alt={alt}
          className={
            "w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px]"
          }
        />
      </div>
      <div>
        <p
          className={
            "text-[#d9d9d9 text-[10px] sm:text-[14px] md:text-[18px] text-white grayscale-0 px-[10px] pb-[10px] leading-4 sm:leading-5 md:leading-7"
          }
        >
          {content}
        </p>
      </div>
    </Link>
  );
};

export default ShortCutCard;
