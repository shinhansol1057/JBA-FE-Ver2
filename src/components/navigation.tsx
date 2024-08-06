import React from "react";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  return (
    <div className={"flex items-center justify-between bg-black px-5"}>
      <h1 lang={"en"} className={"text-lg text-white cursor-pointer"}>
        JBA
      </h1>
      <IoMenu size={26} color={"white"} className={"cursor-pointer"} />
    </div>
  );
};

export default Navigation;
