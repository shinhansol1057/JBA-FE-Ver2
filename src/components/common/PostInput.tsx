"use client";
import React from "react";

type Props = {
  type: string;
  placeHolder: string;
  data: any;
  setData: any;
};
const PostInput = ({ type, placeHolder, data, setData }: Props) => {
  return (
    <div
      className={
        "flex items-center bg-white rounded-[8px] shadow-xl " +
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px] "
      }
    >
      <input
        type={type}
        placeholder={placeHolder}
        value={data}
        onChange={(e) => setData(e.target.value)}
        className={
          "w-[80%] ml-[20px] placeholder:text-[#B5B5B5] border-none " +
          "text-[12px] sm:text-[14px] md:text-[18px] "
        }
      />
    </div>
  );
};

export default PostInput;
