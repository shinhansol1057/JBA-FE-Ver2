import Image from "next/image";

const BannerTop = () => {
  return (
    <div
      className={
        " h-60 sm:h-96 md:h-[800px] text-white flex flex-col relative w-full " +
        "items-end pt-[20px] sm:pt-[70px] md:pt-[140px] pr-[20px] sm:pr-[70px] md:pr-[140px]"
      }
    >
      <Image
        src={"/image/mainPage/banner.jpeg"}
        alt={"bannerImage"}
        width={1000}
        height={1000}
        loading={"eager"}
        property={"true"}
        className={
          "absolute top-0 left-0 w-full h-60 sm:h-96 md:h-[800px] -z-10 object-cover"
        }
      />
      <div className="flex justify-end mt-[30px] sm:mt-[50px]">
        <h1 lang={"en"} className={"text-2xl sm:text-5xl md:text-[7rem]"}>
          JBA
        </h1>
      </div>
      <div className="flex justify-end ">
        <h1 className={"text-xs sm:text-xl md:text-2xl"}>
          제주특별자치도농구협회
        </h1>
      </div>
      <div className={"flex justify-end text-xs sm:text-xl md:text-text-2xl"}>
        <p>-</p>
      </div>
      <div
        className={
          "flex flex-col items-end leading-normal w-[50%] text-[0.625rem] sm:text-base md:text-xl"
        }
      >
        <p className={"mb-2"}>제주특별자치도농구협회에 오신것을 환영합니다!</p>
        <p className={"text-right"}>
          제주특별자치도농구협회는회 농구를 통한 건강한 활동을 촉진하고 우수한
          농구 인재를 발굴함으로써 제주 체육 발전에 기여하고자 합니다.
        </p>
      </div>
    </div>
  );
};

export default BannerTop;
