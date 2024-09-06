import React from "react";
import UpdateCompetitionInfo from "@/containers/jejuCompetition/detail/UpdateCompetitionInfo";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params: { id } }: Props) => {
  return <UpdateCompetitionInfo id={id} />;
};

export default Page;
