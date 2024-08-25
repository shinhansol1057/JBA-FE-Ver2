import React from "react";

const CancelBtn = ({ handler }: { handler: any }) => {
  return (
    <button
      className={
        "font-bold rounded-[8px] bg-[#D9D9D9] text-[#4B4B4B] " +
        "text-[12px] sm:text-[14px] md:text-[18px] " +
        "w-[135px] sm:w-[195px] md:w-[390px] " +
        "h-[30px] sm:h-[30px] md:h-[50px]"
      }
      onClick={handler}
    >
      취소
    </button>
  );
};

export default CancelBtn;
