"use client";
import PostTitle from "@/components/common/PostTitle";
import {
  FetchGetCompetitionDetail,
  getCompetitionResult,
} from "@/services/CompetitionApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DetailCategory from "@/containers/jejuCompetition/detail/DetailCategory";
import DetailInfo from "@/containers/jejuCompetition/detail/DetailInfo";
import DetailResult from "@/containers/jejuCompetition/detail/DetailResult";

const CompetitionDetailPage = ({ id }: { id: string }) => {
  const [selectInfo, setSelectInfo] = useState<boolean>(true);
  const { data: detailData } = useQuery({
    queryKey: ["competitionDetail", id],
    queryFn: () => FetchGetCompetitionDetail(id),
    select: (result) => result?.data.data,
  });
  const { data: resultData } = useQuery({
    queryKey: ["competitionResult", id],
    queryFn: () => getCompetitionResult(id),
    select: (result) => result?.data.data,
  });
  return (
    <div className={"my-[10px] md:my-[20px] "}>
      <PostTitle title={detailData?.title} />
      {detailData && resultData && (
        <DetailCategory
          selectInfo={selectInfo}
          setSelectInfo={setSelectInfo}
          phase={detailData?.phase}
          resultData={resultData}
          id={id}
        />
      )}
      {detailData && resultData && selectInfo && (
        <DetailInfo data={detailData} />
      )}
      {detailData && resultData && !selectInfo && (
        <DetailResult detailData={detailData} resultData={resultData} />
      )}
    </div>
  );
};

export default CompetitionDetailPage;
