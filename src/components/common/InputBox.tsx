"use client";
import React from "react";

type Props = {
  type: string;
  placeHolder: string;
};
const InputBox = ({ type, placeHolder }: Props) => {
  return (
    <div
      className={
        "flex items-center " +
        "w-[280px] sm:w-[400px] md:2-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px] "
      }
    >
      <input type={type} placeholder={placeHolder} />
    </div>
  );
};

export default InputBox;
