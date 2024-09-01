import UpdateVideo from "@/containers/video/UpdateVideo";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <UpdateVideo id={id} />;
};

export default Page;
