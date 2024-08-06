import React from "react";

type Props = {
  data: {
    postId: number;
    title: string;
    writer: string;
    isAnnouncement: boolean;
    viewCount: number;
    createAt: Date;
  };
};

const BannerCarouselCard = ({ data }: Props) => {
  return (
    <div className={"flex flex-col items-center text-center"}>
      <h2
        className={
          "text-[14px] sm:text-[20px] md:text-[30px] my-4 sm:my-5 md:my-6"
        }
      >
        공지사항
      </h2>
      <h3 className={"text-[12px] sm:text-[18px] md:text-[26px]"}>
        {data?.title}
      </h3>
    </div>
  );
};

export default BannerCarouselCard;
