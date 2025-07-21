import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  console.log(id);
  return <div></div>;
};

export default Page;
