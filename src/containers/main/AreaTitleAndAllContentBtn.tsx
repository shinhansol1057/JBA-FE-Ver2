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
          "text-[16px] sm:text-[22px] md:text-[32px] font-bold ml-[10px]"
        }
      >
        {title}
      </h3>
      <button
        className={
          "rounded-[5px] bg-black text-white " +
          "text-[12px] sm:text-[14px] md:text-[20px] " +
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
