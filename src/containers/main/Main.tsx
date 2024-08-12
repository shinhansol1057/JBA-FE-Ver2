import Banner from "@/containers/main/Banner";
import ShortCuts from "@/containers/main/ShortCuts";
import Gallery from "@/containers/main/Gallery";

const Main = () => {
  return (
    <div className="mt-[-30px] sm:mt-[-50px] mb-[100px]">
      <Banner />
      <ShortCuts />
      <Gallery />
    </div>
  );
};

export default Main;
