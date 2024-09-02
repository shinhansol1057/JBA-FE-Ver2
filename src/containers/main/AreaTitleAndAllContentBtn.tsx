"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AreaTitleAndAllContentBtn = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <div className={"w-full flex justify-between items-center mb-[10px]"}>
      <h3
        className={
          "text-[14px] sm:text-[20px] md:text-[28px] font-bold ml-[10px]"
        }
      >
        {title}
      </h3>
      <button
        className={
          "rounded-[5px] bg-black text-white " +
          "text-[8px] sm:text-[10px] md:text-[16px] " +
          "py-[3px] " +
          "px-[7px] md:px-[12px]"
        }
        onClick={() => router.push(url)}
      >
        전체보기
      </button>
    </div>
  );
};

export default AreaTitleAndAllContentBtn;
