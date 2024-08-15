"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BannerCarouselCard from "@/containers/main/BannerCarouselCard";
import { bannerAnnouncement, bannerCompetition } from "@/types/MainPageType";

type Props = {
  data: bannerAnnouncement[] | bannerCompetition[];
};
const BannerCarousel = ({ data }: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots: any) => (
      <div
        className={
          "w-[100%] absolute flex items-center justify-center bottom-0"
        }
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <SliderContainer display={data?.length === 0 ? "none" : "block"}>
      <StyledSlider {...settings}>
        {data?.map((item: bannerAnnouncement | bannerCompetition) => {
          return (
            <BannerCarouselCard
              key={"postId" in item ? item?.postId : item?.competitionId}
              data={item}
            />
          );
        })}
      </StyledSlider>
    </SliderContainer>
  );
};

export default BannerCarousel;

const SliderContainer = styled.div<{ display: string }>`
  &:hover {
    cursor: pointer;
    background-color: rgba(245, 245, 245, 0.2);
  }
  margin: 0 auto;
  position: relative;
  display: ${(props) => props.display};
  background-color: rgba(245, 245, 245, 0.12);
  border-radius: 8px;
  border: 1px solid rgba(115, 115, 115, 0.2);
  .dots_custom {
    position: absolute;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 10px;
    padding: 0;
  }

  .dots_custom li button {
    border: 2px solid #ffffff;
    color: transparent;
    cursor: pointer;
    display: block;
    border-radius: 100%;
    padding: 0;
  }

  .dots_custom li.slick-active button {
    background-color: #ffffff;
  }

  @media screen and (max-width: 640px) {
    width: 280px;
    height: 100px; /* 높이를 높여 카드 간의 간격을 반영 */
    .dots_custom {
      top: 80px;
      left: 100px;
    }
    .dots_custom li button {
      height: 6px;
      width: 6px;
    }
  }

  @media screen and (min-width: 640px) and (max-width: 768px) {
    width: 400px;
    height: 150px; /* 높이를 높여 카드 간의 간격을 반영 */
    .dots_custom {
      top: 120px;
      left: 154px;
    }
    .dots_custom li button {
      height: 9px;
      width: 9px;
    }
  }

  @media screen and (min-width: 768px) {
    width: 600px;
    height: 200px; /* 높이를 높여 카드 간의 간격을 반영 */
    .dots_custom {
      top: 160px;
      left: 250px;
    }
    .dots_custom li button {
      height: 12px;
      width: 12px;
    }
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: white;
  }

  .slide {
    padding: 8px; /* 각 슬라이드에 패딩 추가 */
    box-sizing: border-box; /* 박스 크기를 포함하도록 설정 */
    flex: 1 0 30%; /* 슬라이드 항목을 3개씩 한 줄에 표시 */
  }
`;
