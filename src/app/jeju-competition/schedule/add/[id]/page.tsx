import AddSchedule from "@/containers/jejuCompetition/schedule/AddSchedule";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <AddSchedule id={id} />;
};

export default Page;
