import GalleryCarousel from "@/containers/main/GalleryCarousel";
import { getGalleries } from "@/services/mainPageApi";
import AreaTitleAndAllContentBtn from "@/containers/main/AreaTitleAndAllContentBtn";

const Gallery = async () => {
  const galleries = await getGalleries();

  return (
    <div
      className={
        "flex flex-col mt-6 sm:mt-12 md:mt-20 mx-auto " +
        "w-[90%] sm:w-[80%] md:w-[70%]"
      }
    >
      <AreaTitleAndAllContentBtn title={"갤러리"} url={"/media/gallery"} />
      <div>
        <GalleryCarousel galleries={galleries?.data?.galleries} />
      </div>
    </div>
  );
};

export default Gallery;
