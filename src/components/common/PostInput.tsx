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
        "flex items-center bg-white rounded-lg shadow-xl w-full " +
        "h-10 sm:h-12 md:h-14 "
      }
    >
      <input
        type={type}
        placeholder={placeHolder}
        value={data || ""}
        onChange={(e) => setData(e.target.value)}
        className={
          "w-[80%] ml-5 placeholder:text-[#B5B5B5] border-none " +
          "text-sm sm:text-base md:text-lg "
        }
        autoComplete={"false"}
      />
    </div>
  );
};

export default PostInput;
