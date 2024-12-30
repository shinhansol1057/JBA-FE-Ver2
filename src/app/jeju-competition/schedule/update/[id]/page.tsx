import UpdateSchedule from "@/containers/jejuCompetition/schedule/UpdateSchedule";
import {
  FetchGetCompetitionDetail,
  FetchGetCompetitionScheduleAndResult,
} from "@/services/competitionApi";
import { notFound } from "next/navigation";
import CompetitionDetailPage from "@/containers/jejuCompetition/detail/CompetitionDetailPage";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: Props) => {
  try {
    const detailData = await FetchGetCompetitionDetail(id);
    const resultData = await FetchGetCompetitionScheduleAndResult(id);
    if (!detailData?.data || !resultData?.data) {
      return notFound();
    }
    return (
      <UpdateSchedule
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
