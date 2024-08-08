"use client";
import React from "react";

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
    <div
      className={
        "w-[135px] sm:w-[195px] md:w-[295px] h-[100px] sm:h-[130px] md:h-[160px] " +
        "cursor-pointer rounded-[8px] bg-cover bg-center relative grayscale-[100%] flex flex-col justify-between"
      }
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      onClick={() => (window.location.href = navUrl)}
    >
      <div
        className={
          "absolute top-0 left-0 bg-[rgba(0,0,0,0.78)] w-full h-full rounded-[8px]"
        }
      ></div>
      <div className={"flex justify-between mt-[10px] mx-[10px] grayscale-0"}>
        <h3 className={"text-white text-[14px] font-bold"}>{title}</h3>
        <img src={icon} alt={alt} className={"w-[24px] h-[24px]"} />
      </div>
      <div>
        <p
          className={
            "text-[#d9d9d9 text-[10px] text-white grayscale-0 px-[10px] pb-[10px] leading-4"
          }
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ShortCutCard;
