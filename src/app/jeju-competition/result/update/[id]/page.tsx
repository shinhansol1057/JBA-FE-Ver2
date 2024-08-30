import AddResult from "@/containers/jejuCompetition/schedule/AddResult";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <AddResult id={id} />;
};

export default Page;
