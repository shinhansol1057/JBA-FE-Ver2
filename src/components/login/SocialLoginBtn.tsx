import React from "react";
import Image from "next/image";

type Props = {
  loginFc: () => void;
  imgSrc: string;
  alt: string;
  content: string;
  backgroundColor: string;
};
const SocialLoginBtn = ({
  loginFc,
  imgSrc,
  alt,
  content,
  backgroundColor,
}: Props) => {
  return (
    <button
      onClick={() => loginFc()}
      style={{ backgroundColor: backgroundColor }}
      className={
        "w-[90%] md:w-[500px] h-[60px] rounded-[10px] text-lg font-bold text-black border border-solid border-[#D9D9D9] mt-[10px] flex items-center justify-center "
      }
    >
      <img
        src={imgSrc}
        alt={alt}
        className={`${alt === "naver" ? "w-8" : "w-5"} outline-none border-white mr-2 `}
      />
      {content}
    </button>
  );
};

export default SocialLoginBtn;
