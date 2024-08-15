import Banner from "@/containers/main/Banner";
import ShortCuts from "@/containers/main/ShortCuts";
import Gallery from "@/containers/main/Gallery";
import Footer from "@/containers/main/Footer";

const Main = () => {
  return (
    <div className="mt-[-30px] sm:mt-[-50px] mb-[20px]">
      <Banner />
      <ShortCuts />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Main;
