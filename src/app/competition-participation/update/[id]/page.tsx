import React from "react";
import UpdateParticipation from "@/containers/jejuCompetition/participation/UpdateParticipation";
import { FetchGetParticipation } from "@/services/participationApi";
import { notFound } from "next/navigation";
import { FetchGetCompetitionDetail } from "@/services/competitionApi";
type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  try {
    const participationData = await FetchGetParticipation(id);
    const detailData = await FetchGetCompetitionDetail(
      participationData?.data.competitionId,
    );
    if (!participationData?.data || !detailData?.data) {
      return notFound();
    }
    return (
      <UpdateParticipation
        participationData={participationData.data}
        detailData={detailData.data}
      />
    );
  } catch (error) {
    return notFound();
  }
};

export default Page;
