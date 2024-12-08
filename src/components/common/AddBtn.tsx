import React from "react";

type Props = {
  handler: any;
  text?: string;
};
const AddBtn = ({ handler, text = "등록" }: Props) => {
  return (
    <button
      className={
        "font-bold rounded-lg bg-black text-white w-full " +
        "text-sm sm:text-base md:text-lg " +
        "h-10 sm:h-12 md:h-14"
      }
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default AddBtn;
