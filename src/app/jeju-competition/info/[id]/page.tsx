import CompetitionDetailPage from "@/containers/jejuCompetition/CompetitionDetailPage";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <CompetitionDetailPage id={id} />;
};

export default Page;
