import BannerCarousel from "@/containers/main/bannerCarousel";

const getAnnouncements = async () => {
  const url = process.env.REACT_APP_SERVER_URL + "/v1/api/post/notice?size=3";
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};

const getCompetitions = async () => {
  const url = process.env.REACT_APP_SERVER_URL + "/v1/api/main/competition";
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
};

const Banner = async () => {
  const announcements = await getAnnouncements();
  const competitions = await getCompetitions();
  return (
    <div>
      <div
        className={
          "bg-banner bg-center bg-cover h-60 sm:h-96 md:h-[600px] text-white flex flex-col items-end pt-[20px] sm:pt-[70px] md:pt-[140px] pr-[20px] sm:pr-[70px] md:pr-[140px]"
        }
      >
        <div className="flex justify-end mt-[30px] sm:mt-[50px]">
          <title lang={"en"} className={"text-xl sm:text-5xl md:text-[112px]"}>
            JBA
          </title>
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
          <p className={"mb-2"}>
            제주특별자치도농구협회에 오신것을 환영합니다!
          </p>
          <p className={"text-right"}>
            제주특별자치도농구협회는회 농구를 통한 건강한 활동을 촉진하고 우수한
            농구 인재를 발굴함으로써 제주 체육 발전에 기여하고자 합니다.
          </p>
        </div>
      </div>
      <div
        className={
          "bg-gradient-to-b from-black from-5% to-white to-100% h-[310px] sm:h-[410px] md:h-[510px] flex flex-col items-center"
        }
      >
        <BannerCarousel data={announcements?.data?.posts} />
        <div className={"h-2.5"}></div>
        <BannerCarousel data={competitions?.data.slice(0, 3)} />
      </div>
    </div>
  );
};

export default Banner;
