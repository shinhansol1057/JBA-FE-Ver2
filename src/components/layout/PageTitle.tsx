"use client";
import Link from "next/link";

const PageTitle = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      href={url}
      className={
        "text-[14px] sm:text-[18px] md:text-[24px] font-bold mt-[20px] md:mt-[30px]"
      }
    >
      {title}
    </Link>
  );
};

export default PageTitle;
