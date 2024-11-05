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
        "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
      }
    />
  );
};

export default LoginInputBox;
