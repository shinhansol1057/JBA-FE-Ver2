import React from "react";

const MyPageRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={"flex text-[12px] sm:text-[14px] md:text-[18px]"}>
      <div className={"w-[80px] sm:w-[100px] md:w-[150px]"}>
        <p>{label}</p>
      </div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MyPageRow;
