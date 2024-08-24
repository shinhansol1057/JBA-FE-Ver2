import Image from "next/image";

const BannerTop = () => {
  return (
    <div
      className={
        " h-60 sm:h-96 md:h-[600px] text-white flex flex-col relative " +
        "items-end pt-[20px] sm:pt-[70px] md:pt-[140px] pr-[20px] sm:pr-[70px] md:pr-[140px]"
      }
    >
      <Image
        src={"/image/mainPage/banner.jpeg"}
        alt={"bannerImage"}
        width={1000}
        height={1000}
        className={
          "absolute top-0 left-0 w-full h-60 sm:h-96 md:h-[700px] -z-10 object-cover"
        }
      />
      <div className="flex justify-end mt-[30px] sm:mt-[50px]">
        <h1 lang={"en"} className={"text-xl sm:text-5xl md:text-[112px]"}>
          JBA
        </h1>
      </div>
      <div className="flex justify-end ">
        <h2 lang={"en"} className={"text-xs sm:text-xl md:text-[26px]"}>
          Jeju Basketball Association
        </h2>
      </div>
      <div className={"flex justify-end sm:text-xl md:text-[26px]"}>
        <p>-</p>
      </div>
      <div
        className={
          "flex flex-col items-end text-[9px] leading-normal sm:text-xs w-[50%] md:text-xl"
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
