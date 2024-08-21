"use client";

import React, { useEffect, useRef } from "react";
import CompetitionStatus from "@/containers/jejuCompetition/CompetitionStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostList } from "@/services/CompetitionApi";
import CompetitionListCard from "@/containers/jejuCompetition/CompetitionListCard";
import { useObserver } from "@/hooks/useObserver";
import LoadingText from "@/components/loading/LoadingText";
import { useCompetitionStore } from "@/states/CompetitionStore";

const CompetitionList = () => {
  const bottom = useRef(null);
  const { competitionStatusMenu, setCompetitionStatusMenu } =
    useCompetitionStore();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["getPostList", competitionStatusMenu],
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

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    threshold: 0.1,
  });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, scrollY);
  }, []);

  return (
    <div className={"flex flex-col items-center"}>
      <CompetitionStatus />
      <LoadingText loading={status === "pending"} />
      {status === "success" &&
        data?.pages.map((group: any, i: number) => (
          <React.Fragment key={i}>
            {group.data?.content.map((item: any, i: number) => (
              <CompetitionListCard data={item} key={i} />
            ))}
          </React.Fragment>
        ))}
      <div ref={bottom} />
      <LoadingText loading={isFetchingNextPage} />
    </div>
  );
};

export default CompetitionList;
