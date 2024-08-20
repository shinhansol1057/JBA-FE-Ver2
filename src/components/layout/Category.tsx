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
        "w-[280px] h-[30px] shadow-lg rounded-[8px] border border-solid border-[rgba(115,115,115,0.2)] my-[10px] box-content text-[12px]"
      }
    >
      <button
        className={
          "h-full " +
          (!category2 && !category3
            ? "w-[280px] "
            : !category3
              ? "w-[140px] "
              : "w-[93px] ") +
          (segment === category1Url ? "bg-black text-white rounded-[8px]" : "")
        }
        onClick={() => router.push(defaultUrl + category1Url)}
      >
        {category1}
      </button>
      <button
        className={
          "h-full " +
          (!category2 && !category3
            ? "w-[280px] "
            : !category3
              ? "w-[140px] "
              : "w-[93px] ") +
          (segment === category2Url ? "bg-black text-white rounded-[8px]" : "")
        }
        onClick={() => router.push(defaultUrl + category2Url)}
      >
        {category2}
      </button>
      <button
        className={
          "h-full " +
          (!category2 && !category3
            ? "w-[280px] "
            : !category3
              ? "w-[140px] "
              : "w-[93px] ") +
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
