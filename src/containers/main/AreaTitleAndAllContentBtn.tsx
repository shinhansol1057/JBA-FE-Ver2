"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LinkBtn from "@/components/common/LinkBtn";

const AreaTitleAndAllContentBtn = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  const router = useRouter();
  return (
    <div className={"w-full flex justify-between items-center mb-1.5"}>
      <h3 className={"text-base sm:text-lg md:text-3xl font-bold ml-1.5"}>
        {title}
      </h3>
      <LinkBtn content="전체보기" linkUrl={url} />
    </div>
  );
};

export default AreaTitleAndAllContentBtn;
