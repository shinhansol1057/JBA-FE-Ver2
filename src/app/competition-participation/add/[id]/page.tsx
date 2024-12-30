import React from "react";
import AddParticipation from "@/containers/jejuCompetition/participation/AddParticipation";
import { notFound } from "next/navigation";
import { FetchGetCompetitionDetail } from "@/services/competitionApi";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  try {
    const detailData = await FetchGetCompetitionDetail(id);
    if (!detailData?.data) {
      return notFound();
    }
    return <AddParticipation id={id} detailData={detailData.data} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
