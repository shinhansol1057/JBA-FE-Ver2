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
        "flex flex-row justify-between items-center shadow-xl rounded-lg bg-white " +
        "w-full px-5 py-2 mb-2.5 hover:bg-[rgba(0,0,0,0.3)] "
      }
    >
      <div className={"flex items-center justify-between"}>
        <LuFolder className={"text-2xl md:text-4xl"} />
        <p className={"px-2 text-sm sm:text-base md:text-lg text-start"}>
          {fileName}
        </p>
      </div>
      <AiOutlineDownload className={"text-2xl md:text-4xl"} />
    </button>
  );
};

export default GetFileBox;
