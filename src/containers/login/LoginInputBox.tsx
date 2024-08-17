"use client";
import React from "react";

type Props = {
  type: string;
  id: string;
  value: string;
  setValue: (value: ((prevState: string) => string) | string) => void;
};
const LoginInputBox = ({ type, id, setValue, value }: Props) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      autoComplete={type === "password" ? "off" : "on"}
      onChange={(e) => setValue(e.target.value)}
      className={
        "mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] px-[20px]"
      }
    />
  );
};

export default LoginInputBox;
