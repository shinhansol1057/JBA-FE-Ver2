import React from "react";
import { getPostListItemType } from "@/types/PostType";
import { TiPin } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  data: getPostListItemType;
  category: string;
};
const PostListCard = ({ data, category }: Props) => {
  const pathname: string = usePathname();
  let cardCategory: string;
  if (category === "notice") {
    if (data.isAnnouncement) {
      cardCategory = "[공지]";
    } else {
      cardCategory = "공지사항";
    }
  } else if (category === "news") {
    cardCategory = "NEWS";
  } else {
    cardCategory = "자료실";
  }

  return (
    <Link
      className={
        "flex flex-col justify-between py-[20px] " +
        "pl-[20px] mb-[10px] md:mb-[20px] " +
        "rounded-[8px] shadow-xl cursor-pointer " +
        "h-[100px] sm:h-[120px] md:h-[150px] " +
        (data.isAnnouncement
          ? "bg-black text-white "
          : "bg-white text-[#4B4B4B] ")
      }
      href={pathname + `/${data.postId}`}
    >
      <div>
        <div className={"flex mb-[5px] md:mb-[10px] "}>
          <p
            className={
              data.isAnnouncement
                ? "text-[12px] sm:text-[14px] md:text-[20px] text-[#FFC700] "
                : "text-[10px] sm:text-[12px] md:text-[14px] "
            }
          >
            {cardCategory}
          </p>
          {data.isAnnouncement ? (
            <TiPin
              className={
                "text-[14px] sm:text-[18px] md:text-[22px] text-[#FFC700] pb-[3px]"
              }
            />
          ) : (
            ""
          )}
        </div>
        <h1 className={"text-[12px] sm:text-[14px] md:text-[20px]"}>
          {data.title}
        </h1>
      </div>
      <p className={"text-[10px] sm:text-[12px] md:text-[14px]"}>
        {data.createAt}
      </p>
    </Link>
  );
};

export default PostListCard;
