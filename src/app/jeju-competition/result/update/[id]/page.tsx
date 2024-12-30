import AddResult from "@/containers/jejuCompetition/schedule/AddResult";
import {
  FetchGetCompetitionDetail,
  FetchGetCompetitionScheduleAndResult,
} from "@/services/competitionApi";
import { notFound } from "next/navigation";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const detailData = await FetchGetCompetitionDetail(id);
    const resultData = await FetchGetCompetitionScheduleAndResult(id);
    if (!detailData?.data || !resultData?.data) {
      return notFound();
    }
    return (
      <AddResult
        id={id}
        detailData={detailData.data}
        resultData={resultData.data}
      />
    );
  } catch (error) {
    return notFound();
  }
};

export default Page;
