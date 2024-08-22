"use client";
import PostTitle from "@/components/PostTitle";
import { getCompetitionDetail } from "@/services/CompetitionApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DetailCategory from "@/containers/jejuCompetition/detail/DetailCategory";
import DetailInfo from "@/containers/jejuCompetition/detail/DetailInfo";

const CompetitionDetailPage = ({ id }: { id: string }) => {
  const [selectInfo, setSelectInfo] = useState<boolean>(true);
  const { data: detailData } = useQuery({
    queryKey: ["competitionDetail", id],
    queryFn: () => getCompetitionDetail(id),
    select: (result) => result?.data.data,
  });
  return (
    <div className={"my-[10px] md:my-[20px] "}>
      <PostTitle title={detailData?.title} />
      <DetailCategory selectInfo={selectInfo} setSelectInfo={setSelectInfo} />
      {detailData && selectInfo && <DetailInfo data={detailData} />}
    </div>
  );
};

export default CompetitionDetailPage;
