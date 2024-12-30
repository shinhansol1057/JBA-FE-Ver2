import React from "react";
import Link from "next/link";

const MyComponent = () => {
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl">404</h1>
      <h2 className="text-2xl">페이지를 찾을 수 없습니다.</h2>
      <p className=" my-2">죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>
      <Link
        href={"/"}
        className="font-bold bg-black rounded-lg p-3 text-white flex items-center"
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default MyComponent;
