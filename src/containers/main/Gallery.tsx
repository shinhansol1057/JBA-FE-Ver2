import GalleryCarousel from "@/containers/main/GalleryCarousel";
import { getGalleries } from "@/services/mainPageApi";

const Gallery = async () => {
  const galleries = await getGalleries();
  console.log(galleries.data.galleries);

  return (
    <div
      className={
        "flex flex-col mt-[25px] sm:mt-[50px] md:mt-[75px] mx-auto " +
        "w-[280px] sm:w-[400px] md:w-[600px]"
      }
    >
      <div>
        <h3
          className={
            "text-[14px] sm:text-[20px] md:text-[28px] font-bold ml-[10px] mb-[10px]"
          }
        >
          갤러리
        </h3>
      </div>
      <div>
        <GalleryCarousel galleries={galleries?.data.galleries} />
      </div>
    </div>
  );
};

export default Gallery;
