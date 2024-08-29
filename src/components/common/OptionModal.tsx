import React from "react";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteHandler: any;
  updateHandler: any;
};
const OptionModal = ({ setModalOpen, deleteHandler, updateHandler }: Props) => {
  useAxiosInterceptor();
  return (
    <div className={"w-full h-full flex flex-col justify-end items-center"}>
      <div
        className={"w-full h-full"}
        onClick={() => setModalOpen(false)}
      ></div>
      <div
        className={"flex flex-col text-[14px] sm:text-[16px] md:text-[20px]"}
      >
        <button
          className={
            "w-[280px] sm:w-[350px] md:w-[600px] " +
            "h-[45px] sm:h-[60px] md:h-[90px] " +
            "bg-[#D9D9D9] rounded-t-[10px] border border-solid border-[#B5B5B5] hover:bg-[#B5B5B5]"
          }
          onClick={updateHandler}
        >
          수정
        </button>
        <button
          className={
            "w-[280px] sm:w-[350px] md:w-[600px] " +
            "h-[45px] sm:h-[60px] md:h-[90px] " +
            "bg-[#D9D9D9] rounded-b-[10px] text-[#DF1A1A] hover:bg-[#B5B5B5]"
          }
          onClick={deleteHandler}
        >
          삭제
        </button>
        <button
          className={
            "w-[280px] sm:w-[350px] md:w-[600px] " +
            "h-[45px] sm:h-[60px] md:h-[90px] " +
            "bg-[#D9D9D9] rounded-[10px] my-[20px] hover:bg-[#B5B5B5]"
          }
          onClick={() => setModalOpen(false)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default OptionModal;
