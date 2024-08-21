"use client";
import PostTitle from "@/components/PostTitle";
import { getCompetitionDetail } from "@/services/CompetitionApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DetailCategory from "@/containers/jejuCompetition/detail/DetailCategory";
import DetailContainer from "@/containers/jejuCompetition/detail/DetailContainer";

const CompetitionDetailPage = ({ id }: { id: string }) => {
  const [selectInfo, setSelectInfo] = useState<boolean>(true);
  const { data: detailData } = useQuery({
    queryKey: ["competitionDetail"],
    queryFn: () => getCompetitionDetail(id),
    select: (result) => result?.data.data,
  });
  return (
    <div className={"my-[10px] md:my-[20px] "}>
      <PostTitle title={detailData?.title} />
      <DetailCategory selectInfo={selectInfo} setSelectInfo={setSelectInfo} />
      {detailData && <DetailContainer data={detailData} />}
    </div>
  );
};

export default CompetitionDetailPage;
