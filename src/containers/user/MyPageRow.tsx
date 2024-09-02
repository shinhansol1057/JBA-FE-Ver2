import React from "react";

const MyPageRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={"flex text-[12px] sm:text-[14px] md:text-[18px]"}>
      <div className={"w-[30%]"}>
        <p>{label}</p>
      </div>
      <div className={"w-[70%]"}>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MyPageRow;
