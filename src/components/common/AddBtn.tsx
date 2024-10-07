import React from "react";

type Props = {
  handler: any;
};
const AddBtn = ({ handler }: Props) => {
  return (
    <button
      className={
        "font-bold rounded-lg bg-black text-white w-full " +
        "text-sm sm:text-base md:text-lg " +
        "h-10 sm:h-12 md:h-14"
      }
      onClick={handler}
    >
      등록
    </button>
  );
};

export default AddBtn;
