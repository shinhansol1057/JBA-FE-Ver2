"use client";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div
      className={"w-full h-[80vh] flex flex-col justify-center items-center"}
    >
      <FaCircleCheck size={34} />
      <p className={"mt-2.5 font-bold text-lg md:text-2xl md:mt-5"}>
        참가신청이 완료 되었습니다!
      </p>
      <div className={"flex flex-col gap-4 mt-10"}>
        <button
          className={
            "px-5 md:px-10 py-2 md:py-4 bg-black text-white rounded-[20px] md:text-xl"
          }
          onClick={() => router.push("/jeju-competition/info")}
        >
          신청내역 보기 &gt;
        </button>
        <button
          className={
            "px-5 md:px-10 py-2 md:py-4 bg-[#D9D9D9] text-[4B4B4B] rounded-[20px] md:text-xl"
          }
          onClick={() => router.push("/jeju-competition/info")}
        >
          대회 이어 보기 &gt;
        </button>
      </div>
    </div>
  );
};

export default Page;
