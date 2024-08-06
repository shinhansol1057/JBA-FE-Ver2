"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BannerCarouselCard from "@/containers/main/BannerCarouselCard";

const BannerCarousel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const getAnnouncements = async () => {
    const url = "https://jbaserver.shop/v1/api/post/notice?size=3";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  console.log(announcements);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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

  useEffect(() => {
    getAnnouncements().then((res) => setAnnouncements(res?.data?.posts));
  }, []);

  return (
    <SliderContainer>
      <StyledSlider {...settings}>
        {announcements?.map(
          (item: {
            postId: number;
            title: string;
            writer: string;
            isAnnouncement: boolean;
            viewCount: number;
            createAt: Date;
          }) => {
            return <BannerCarouselCard key={item?.postId} data={item} />;
          },
        )}
      </StyledSlider>
    </SliderContainer>
  );
};

export default BannerCarousel;

const CustomPrevArrow = ({ onClick, style }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        position: "absolute",
      }}
      className={"top-[78%] md:top-[70%] left-[-50px]"}
    >
      <IoIosArrowBack
        className={"hidden sm:block sm:size-8 md:size-14"}
        color={"#FFFFFF"}
      />
    </button>
  );
};

const CustomNextArrow = ({ onClick, style }: any) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        position: "absolute",
      }}
      className={"top-[78%] md:top-[70%] right-[-50px]"}
    >
      <IoIosArrowForward
        className={"hidden sm:block sm:size-8 md:size-14"}
        color={"#FFFFFF"}
      />
    </button>
  );
};

const SliderContainer = styled.div`
  position: relative;

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
    background-color: rgba(245, 245, 245, 0.12);
    border-radius: 8px;
    border: 1px solid rgba(115, 115, 115, 0.2);
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
    background-color: rgba(245, 245, 245, 0.12);
    border-radius: 8px;
    border: 1px solid rgba(115, 115, 115, 0.2);
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
    background-color: rgba(245, 245, 245, 0.12);
    border-radius: 8px;
    border: 1px solid rgba(115, 115, 115, 0.2);
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
