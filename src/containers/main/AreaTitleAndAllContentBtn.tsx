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
    <div className={"w-full flex justify-between items-center mb-2.5"}>
      <h3 className={"text-base sm:text-lg md:text-3xl font-bold ml-2.5"}>
        {title}
      </h3>
      <button
        className={
          "rounded-md bg-black text-white " +
          "text-sm sm:text-base md:text-xl " +
          "py-2 md:py-3 " +
          "px-2 md:px-3"
        }
        onClick={() => router.push(url)}
      >
        전체보기
      </button>
    </div>
  );
};

export default AreaTitleAndAllContentBtn;
