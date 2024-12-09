import React from "react";
import MyParticipationDetail from "@/containers/jejuCompetition/participation/MyParticipationDetail";
type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <MyParticipationDetail id={id} />;
};

export default Page;
