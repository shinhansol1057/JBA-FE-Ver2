"use client";

import { bannerAnnouncement, bannerCompetition } from "@/types/MainPageType";
import { FormDate } from "@/utils/FormDate";
import Link from "next/link";

type Props = {
  data: bannerAnnouncement | bannerCompetition;
};

const BannerCarouselCard = ({ data }: Props) => {
  return (
    // TODO: Link 연결 필요
    <Link
      className={"flex flex-col items-center text-center"}
      href={
        "postId" in data
          ? `/association/announcement/${data.postId}`
          : `/jeju-competition/info/${data.competitionId}`
      }
    >
      <h2
        className={
          "text-[14px] sm:text-[20px] md:text-[30px] my-3 sm:my-4 md:my-5"
        }
      >
        {"postId" in data ? "공지사항" : "대회일정"}
      </h2>
      <h3 className={"text-[12px] sm:text-[18px] md:text-[26px]"}>
        {data?.title}
      </h3>
      <p
        className={
          "text-[9px] sm:text-[12px] md:text-[18px] mt-2 sm:mt-3 md:mt-4"
        }
      >
        {"postId" in data
          ? FormDate(data.createAt)
          : FormDate(data.startDate) + " ~ " + FormDate(data.endDate)}
      </p>
    </Link>
  );
};

export default BannerCarouselCard;
