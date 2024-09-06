import React from "react";
import UpdateGallery from "@/containers/gallery/UpdateGallery";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <UpdateGallery id={id} />;
};

export default Page;
