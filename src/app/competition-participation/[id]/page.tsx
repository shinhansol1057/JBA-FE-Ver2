import React from "react";
import MyParticipationDetail from "@/containers/jejuCompetition/participation/MyParticipationDetail";
import { FetchGetParticipation } from "@/services/participationApi";
type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  const data = await FetchGetParticipation(id);
  console.log(data);
  return <MyParticipationDetail data={data.data} />;
};

export default Page;
