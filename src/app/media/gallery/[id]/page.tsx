import GalleryDetail from "@/containers/gallery/GalleryDetail";
type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <GalleryDetail id={id} />;
};

export default Page;
