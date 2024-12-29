import React from "react";
import UpdateParticipation from "@/containers/jejuCompetition/participation/UpdateParticipation";
import { FetchGetParticipation } from "@/services/participationApi";
type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  const data = await FetchGetParticipation(id);
  return <UpdateParticipation participationData={data.data} />;
};

export default Page;
