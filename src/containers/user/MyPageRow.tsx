import React from "react";

const MyPageRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={"flex text-sm sm:text-base md:text-lg"}>
      <div className={"w-24 md:w-40"}>
        <p>{label}</p>
      </div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MyPageRow;
