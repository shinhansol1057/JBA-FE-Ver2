import CompetitionDetailPage from "@/containers/jejuCompetition/detail/CompetitionDetailPage";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <CompetitionDetailPage id={id} />;
};

export default Page;
