import AddCompetitionInfo from "@/containers/jejuCompetition/detail/AddCompetitionInfo";
import { FetchGetDivisionList } from "@/services/competitionApi";
import { notFound } from "next/navigation";

const Page = async () => {
  try {
    const divisionData = await FetchGetDivisionList();
    if (!divisionData?.data) {
      return notFound();
    }
    return <AddCompetitionInfo divisionData={divisionData.data} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
