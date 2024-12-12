import React from "react";
import AddParticipation from "@/containers/jejuCompetition/participation/AddParticipation";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <AddParticipation id={id} />;
};

export default Page;
