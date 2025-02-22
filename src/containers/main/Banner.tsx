import BannerCarousel from "@/containers/main/BannerCarousel";
import { getAnnouncements, getCompetitions } from "@/services/mainPageApi";
import BannerTop from "@/containers/main/BannerTop";

const Banner = async () => {
  const announcements = await getAnnouncements();
  const competitions = await getCompetitions();
  return (
    <div className={"w-full"}>
      <BannerTop />
      <div
        className={
          "w-full bg-gradient-to-b from-black from-5% to-[#F5F5F5] to-100% h-[350px] sm:h-[410px] md:h-[510px] flex flex-col "
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
