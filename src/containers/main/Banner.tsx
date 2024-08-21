import BannerCarousel from "@/containers/main/BannerCarousel";
import { getAnnouncements, getCompetitions } from "@/services/MainPageApi";
import BannerTop from "@/containers/main/BannerTop";

const Banner = async () => {
  const announcements = await getAnnouncements();
  const competitions = await getCompetitions();
  return (
    <div>
      <BannerTop />
      <div
        className={
          "bg-gradient-to-b from-black from-5% to-[#F5F5F5] to-100% h-[310px] sm:h-[410px] md:h-[510px] flex flex-col "
        }
      >
        {announcements && <BannerCarousel data={announcements?.data?.posts} />}
        <div className={"h-2.5"}></div>
        {competitions && (
          <BannerCarousel data={competitions?.data?.slice(0, 3)} />
        )}
      </div>
    </div>
  );
};

export default Banner;
