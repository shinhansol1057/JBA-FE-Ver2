import React from "react";
import Link from "next/link";

type Props = {
  content: string;
  linkUrl: string;
  fc?: () => void;
  size?: "small" | "large";
};
const LinkBtn = ({ content, linkUrl, fc, size = "small" }: Props) => {
  return (
    <Link
      href={linkUrl ? linkUrl : "#"}
      className={
        "flex justify-center items-center font-bold text-white bg-black rounded-2xl " +
        (size === "small"
          ? "px-3 py-1 md:px-6 md:py-2 text-xs md:text-base "
          : "px-6 py-2 text-base md:text-lg ")
      }
      onClick={fc}
    >
      {content}
    </Link>
  );
};

export default LinkBtn;
