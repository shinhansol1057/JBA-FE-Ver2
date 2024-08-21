"use client";

import React, { useRef, useState } from "react";
import CompetitionStatus from "@/containers/jejuCompetition/CompetitionStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostList } from "@/services/CompetitionApi";
import CompetitionListCard from "@/containers/jejuCompetition/CompetitionListCard";
import { useObserver } from "@/hooks/useObserver";

const CompetitionList = () => {
  const [competitionStatus, setCompetitionStatus] = useState<string>("ALL");
  const bottom = useRef(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["getPostList", competitionStatus],
    queryFn: getPostList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.last) {
        // lastPage 가 마지막 페이지였다면 api 호출을 하지 않는다.
        return undefined;
      } else {
        return lastPage.data.pageable.pageNumber + 1; // 다음 페이지 리턴
      }
    },
  });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <div className={"flex flex-col items-center"}>
      <CompetitionStatus
        competitionStatus={competitionStatus}
        setCompetitionStatus={setCompetitionStatus}
      />
      {status === "loading" && <p>불러오는 중</p>}
      {status === "success" &&
        data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data?.content.map((item, i) => (
              <CompetitionListCard data={item} key={i} />
            ))}
          </React.Fragment>
        ))}
      <button onClick={() => fetchNextPage()} className={"mt-[5px]"}>
        더보기
      </button>
      <div ref={bottom} />
      {isFetchingNextPage && <p>게속 불러오는중</p>}
    </div>
  );
};

export default CompetitionList;
