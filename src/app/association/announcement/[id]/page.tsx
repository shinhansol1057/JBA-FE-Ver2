import PostDetail from "@/containers/post/PostDetail";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <PostDetail id={id} />;
};

export default Page;
