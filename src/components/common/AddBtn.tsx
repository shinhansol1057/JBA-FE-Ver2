import React from "react";

type Props = {
  handler: any;
};
const AddBtn = ({ handler }: Props) => {
  return (
    <button
      className={
        "font-bold rounded-[8px] bg-black text-white " +
        "text-[12px] sm:text-[14px] md:text-[18px] " +
        "w-[135px] sm:w-[195px] md:w-[390px] " +
        "h-[30px] sm:h-[30px] md:h-[50px]"
      }
      onClick={handler}
    >
      등록
    </button>
  );
};

export default AddBtn;
