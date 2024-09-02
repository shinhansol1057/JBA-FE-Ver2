import GalleryCarousel from "@/containers/main/GalleryCarousel";
import { getGalleries } from "@/services/MainPageApi";
import AllContentBtn from "@/containers/main/AllContentBtn";

const Gallery = async () => {
  const galleries = await getGalleries();

  return (
    <div
      className={
        "flex flex-col mt-[25px] sm:mt-[50px] md:mt-[75px] mx-auto " +
        "w-[280px] sm:w-[400px] md:w-[600px]"
      }
    >
      <AllContentBtn url={"/media/gallery"} />
      <div>
        <GalleryCarousel galleries={galleries?.data.galleries} />
      </div>
    </div>
  );
};

export default Gallery;
