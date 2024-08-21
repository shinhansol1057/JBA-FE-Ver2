import PostTitle from "@/components/PostTitle";
import { getCompetitionDetail } from "@/services/CompetitionApi";

const CompetitionDetailPage = async ({ id }: { id: string }) => {
  const competitionDetailData = await getCompetitionDetail(id);
  console.log(competitionDetailData);
  return (
    <div className={"my-[10px] md:my-[20px] "}>
      <PostTitle title={competitionDetailData.data.title} />
    </div>
  );
};

export default CompetitionDetailPage;
