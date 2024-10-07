import React from "react";

const CancelBtn = ({ handler }: { handler: any }) => {
  return (
    <button
      className={
        "font-bold rounded-lg bg-[#D9D9D9] text-[#4B4B4B] " +
        "text-sm sm:text-base md:text-lg " +
        "h-10 sm:h-12 md:h-14"
      }
      onClick={handler}
    >
      취소
    </button>
  );
};

export default CancelBtn;
