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
        "flex flex-row justify-between items-center shadow-xl rounded-[8px] px-[20px] bg-white mb-[10px] hover:bg-[rgba(0,0,0,0.3)] " +
        "w-[278px] sm:w-[398px] md:w-[800px] " +
        "h-[35px] sm:h-[45px] md:h-[60px] "
      }
    >
      <div className={"flex flex-row "}>
        <LuFolder className={"text-[15px] sm:text-[20px] md:text-[30px]"} />
        <p
          className={
            "ml-[10px] text-[10px] sm:text-[12px] md:text-[16px] content-center"
          }
        >
          {fileName}
        </p>
      </div>
      <AiOutlineDownload
        className={"text-[15px] sm:text-[20px] md:text-[30px]"}
      />
    </button>
  );
};

export default GetFileBox;
