"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";

type Props = {
  category1: string;
  category2?: string;
  category3?: string;
  category1Url: string;
  category2Url?: string;
  category3Url?: string;
  defaultUrl: string;
};

const Category = ({
  category1,
  category2,
  category3,
  category1Url,
  category2Url,
  category3Url,
  defaultUrl,
}: Props) => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <div
      className={
        (!category2 && !category3
          ? "grid grid-cols-1 "
          : !category3
            ? "grid grid-cols-2 "
            : "grid grid-cols-3 ") +
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[60px] " +
        "my-[10px] sm:my-[15px] md:my-[25px] " +
        "text-[12px] sm:text-[14px] md:text-[20px] " +
        "shadow-lg rounded-[8px] border border-solid border-[rgba(115,115,115,0.2)] box-content "
      }
    >
      <button
        className={
          "h-[30px] sm:h-[40px] md:h-[60px] " +
          (segment === category1Url ? "bg-black text-white rounded-[8px]" : "")
        }
        onClick={() => router.push(defaultUrl + category1Url)}
      >
        {category1}
      </button>
      <button
        className={
          "h-[30px] sm:h-[40px] md:h-[60px] " +
          (segment === category2Url ? "bg-black text-white rounded-[8px]" : "")
        }
        onClick={() => router.push(defaultUrl + category2Url)}
      >
        {category2}
      </button>
      <button
        className={
          "h-[30px] sm:h-[40px] md:h-[60px] " +
          (segment === category3Url ? "bg-black text-white rounded-[8px]" : "")
        }
        onClick={() => router.push(defaultUrl + category3Url)}
      >
        {category3}
      </button>
    </div>
  );
};

export default Category;
