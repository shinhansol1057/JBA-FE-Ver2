import GalleryCarousel from "@/containers/main/GalleryCarousel";
import { getGalleries } from "@/services/MainPageApi";
import AreaTitleAndAllContentBtn from "@/containers/main/AreaTitleAndAllContentBtn";

const Gallery = async () => {
  const galleries = await getGalleries();

  return (
    <div
      className={
        "flex flex-col mt-[25px] sm:mt-[50px] md:mt-[75px] mx-auto " +
        "w-[90%] sm:w-[80%] md:w-[70%]"
      }
    >
      <AreaTitleAndAllContentBtn title={"갤러리"} url={"/media/gallery"} />
      <div>
        <GalleryCarousel galleries={galleries?.data.galleries} />
      </div>
    </div>
  );
};

export default Gallery;
