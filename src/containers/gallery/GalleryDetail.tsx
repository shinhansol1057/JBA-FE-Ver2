import { FetchGetGalleryDetail } from "@/services/GalleryApi";
import PostTitle from "@/components/common/PostTitle";
import GalleryDetailCard from "@/containers/gallery/GalleryDetailCard";
import { getGalleryDetailType } from "@/types/GalleryType";

const GalleryDetail = async ({ id }: { id: string }) => {
  const data = await FetchGetGalleryDetail(id);

  return (
    <div className={"my-2.5 md:my-5 w-[90%] md:w-[800px]"}>
      <PostTitle title={data?.data?.title} />
      <div
        className={"grid grid-cols-2 gap-2.5 md:gap-5 mt-8 sm:mt-10 md:mt-12"}
      >
        {data?.data?.files.map((photo: getGalleryDetailType) => {
          return <GalleryDetailCard key={photo.fileId} data={photo} />;
        })}
      </div>
    </div>
  );
};

export default GalleryDetail;
