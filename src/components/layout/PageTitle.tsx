"use client";
import Link from "next/link";

const PageTitle = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      href={url}
      className={
        "text-xl sm:text-2xl md:text-3xl font-bold mt-[20px] md:mt-[30px]"
      }
    >
      {title}
    </Link>
  );
};

export default PageTitle;
