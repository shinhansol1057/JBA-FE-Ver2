import React from "react";

type Props = {
  selectInfo: boolean;
  setSelectInfo: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const DetailCategory = ({ selectInfo, setSelectInfo }: Props) => {
  return (
    <div
      className={
        "grid grid-cols-2 shadow-xl rounded-[8px] bg-[rgba(245,245,245,0.1)] border border-solid border-borderColor " +
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px] " +
        "text-[12px] sm:text-[14px] md:text-[20px] " +
        "my-[10px] md:my[20px] "
      }
    >
      <button
        className={selectInfo ? "rounded-[8px] bg-black text-white" : ""}
        onClick={() => setSelectInfo(true)}
      >
        대회개요
      </button>
      <button
        className={selectInfo ? "" : "rounded-[8px] bg-black text-white"}
        onClick={() => setSelectInfo(false)}
      >
        대회일정
      </button>
    </div>
  );
};

export default DetailCategory;
