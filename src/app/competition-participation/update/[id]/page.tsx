import React from "react";
import UpdateParticipation from "@/containers/jejuCompetition/participation/UpdateParticipation";
type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <UpdateParticipation id={id} />;
};

export default Page;
