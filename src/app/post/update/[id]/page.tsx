import React from "react";
import UpdatePost from "@/containers/post/UpdatePost";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <UpdatePost id={id} />;
};

export default Page;
