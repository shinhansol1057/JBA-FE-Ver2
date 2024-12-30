import React from "react";
import UpdateCompetitionInfo from "@/containers/jejuCompetition/detail/UpdateCompetitionInfo";
import {
  FetchGetCompetitionDetail,
  FetchGetDivisionList,
} from "@/services/competitionApi";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  try {
    const detailData = await FetchGetCompetitionDetail(id);
    const divisionData = await FetchGetDivisionList();
    if (!detailData?.data || !divisionData?.data) {
      return notFound();
    }
    return (
      <UpdateCompetitionInfo
        id={id}
        detailData={detailData.data}
        divisionData={divisionData.data}
      />
    );
  } catch (error) {
    return notFound();
  }
};

export default Page;
