"use client";
import React from "react";
import { LuFolder } from "react-icons/lu";
import { AiOutlineDownload } from "react-icons/ai";
import { handleDownload } from "@/utils/HandleDownload";

type Props = {
  fileName: string;
  fileUrl: string;
};
const GetFileBox = ({ fileName, fileUrl }: Props) => {
  return (
    <button
      onClick={() => handleDownload(fileUrl, fileName)}
      className={
        "flex flex-row justify-between items-center shadow-xl rounded-lg px-5 bg-white mb-2.5 hover:bg-[rgba(0,0,0,0.3)] " +
        "w-full h-10 sm:h-12 md:h-16 "
      }
    >
      <div className={"flex items-center"}>
        <LuFolder className={"text-base sm:text-xl md:text-3xl"} />
        <p className={"ml-2.5 text-sm sm:text-base md:text-lg content-center"}>
          {fileName}
        </p>
      </div>
      <AiOutlineDownload className={"text-base sm:text-xl md:text-3xl"} />
    </button>
  );
};

export default GetFileBox;
