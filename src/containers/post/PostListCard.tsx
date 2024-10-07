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
        "flex flex-col justify-between " +
        "py-5 pl-5 mb-3 md:mb-5 " +
        "rounded-lg shadow-xl cursor-pointer " +
        "h-28 sm:h-32 md:h-40 " +
        (data.isAnnouncement
          ? "bg-black text-white "
          : "bg-white text-[#4B4B4B] ")
      }
      href={pathname + `/${data.postId}`}
    >
      <div>
        <div className={"flex mb-1 md:mb-2 items-center"}>
          <p
            className={
              data.isAnnouncement
                ? "text-sm sm:text-base md:text-xl text-[#FFC700] "
                : "text-xs sm:text-sm md:text-base "
            }
          >
            {cardCategory}
          </p>
          {data.isAnnouncement ? (
            <TiPin
              className={"text-base sm:text-xl md:text-2xl text-[#FFC700] "}
            />
          ) : (
            ""
          )}
        </div>
        <h1 className={"text-base sm:text-lg md:text-xl"}>{data.title}</h1>
      </div>
      <p className={"text-sm sm:text-base md:text-lg"}>{data.createAt}</p>
    </Link>
  );
};

export default PostListCard;
