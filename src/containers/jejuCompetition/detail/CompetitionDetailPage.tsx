"use client";
import PostTitle from "@/components/common/PostTitle";
import { useState } from "react";
import DetailCategory from "@/containers/jejuCompetition/detail/DetailCategory";
import DetailInfo from "@/containers/jejuCompetition/detail/DetailInfo";
import DetailResult from "@/containers/jejuCompetition/detail/DetailResult";
import {
  CompetitionDetailType,
  CompetitionResultType,
} from "@/types/competitionType";

type Props = {
  id: string;
  detailData: CompetitionDetailType;
  resultData: CompetitionResultType[];
};
const CompetitionDetailPage = ({ id, detailData, resultData }: Props) => {
  const [selectInfo, setSelectInfo] = useState<boolean>(true);

  return (
    <div className={"my-2.5 md:my-5 w-[90%] md:w-[800px]"}>
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
