"use client";

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

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
  const pathname: string = usePathname();
  const segment = useSelectedLayoutSegment() || pathname.split("/").pop();
  const router = useRouter();
  if (
    pathname === defaultUrl + category1Url ||
    pathname === defaultUrl + category2Url ||
    pathname === defaultUrl + category3Url
  ) {
    return (
      <div
        className={
          (!category2 && !category3
            ? "grid grid-cols-1 "
            : !category3
              ? "grid grid-cols-2 "
              : "grid grid-cols-3 ") +
          "w-[90%] md:w-[800px] " +
          "h-10 sm:h-12 md:h-14 " +
          "my-2.5 sm:my-4 md:my-6 " +
          "text-sm sm:text-base md:text-xl " +
          "shadow-lg rounded-lg border border-solid border-[rgba(115,115,115,0.2)] box-content "
        }
      >
        <button
          className={
            "h-10 sm:h-12 md:h-14 " +
            (segment === category1Url ? "bg-black text-white rounded-lg" : "")
          }
          onClick={() => router.push(defaultUrl + category1Url)}
        >
          {category1}
        </button>
        <button
          className={
            "h-10 sm:h-12 md:h-14 " +
            (segment === category2Url ? "bg-black text-white rounded-lg" : "")
          }
          onClick={() => router.push(defaultUrl + category2Url)}
        >
          {category2}
        </button>
        <button
          className={
            "h-10 sm:h-12 md:h-14 " +
            (segment === category3Url ? "bg-black text-white rounded-lg" : "")
          }
          onClick={() => router.push(defaultUrl + category3Url)}
        >
          {category3}
        </button>
      </div>
    );
  }
  return null;
};

export default Category;
