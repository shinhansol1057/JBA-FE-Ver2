"use client";

import React, { useEffect, useRef } from "react";
import CompetitionStatus from "@/containers/jejuCompetition/list/CompetitionStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCompetitionList } from "@/services/CompetitionApi";
import CompetitionListCard from "@/containers/jejuCompetition/list/CompetitionListCard";
import { useObserver } from "@/hooks/useObserver";
import LoadingText from "@/components/common/LoadingText";
import { useCompetitionStore } from "@/states/CompetitionStore";

const CompetitionList = () => {
  const bottom = useRef(null);
  const { competitionStatusMenu, setCompetitionStatusMenu } =
    useCompetitionStore();
  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["getCompetitionList", competitionStatusMenu],
    queryFn: getCompetitionList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.data?.last) {
        // lastPage 가 마지막 페이지였다면 api 호출을 하지 않는다.
        return undefined;
      } else {
        return lastPage?.data?.pageable.pageNumber + 1; // 다음 페이지 리턴
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
      {data?.pages[0].data.totalElements === 0 && (
        <p
          className={
            "text-red-500 mt-[20px] text-[12px] sm:text-[14px] md:text-[20px]"
          }
        >
          대회가 없습니다.
        </p>
      )}
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
