import UpdateSchedule from "@/containers/jejuCompetition/schedule/UpdateSchedule";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <UpdateSchedule id={id} />;
};

export default Page;
