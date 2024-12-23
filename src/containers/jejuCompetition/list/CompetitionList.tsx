"use client";

import React, { useEffect, useRef } from "react";
import CompetitionStatus from "@/containers/jejuCompetition/list/CompetitionStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchGetCompetitionList } from "@/services/CompetitionApi";
import CompetitionListCard from "@/containers/jejuCompetition/list/CompetitionListCard";
import { useObserver } from "@/hooks/useObserver";
import LoadingText from "@/components/common/LoadingText";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { GetVideoType } from "@/types/videoType";
import AddPageRouter from "@/components/common/AddPageRouter";

const CompetitionList = () => {
  const bottom = useRef(null);
  const { competitionStatusMenu, setCompetitionStatusMenu } =
    useCompetitionStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["getCompetitionList", competitionStatusMenu],
      queryFn: FetchGetCompetitionList,
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

  // 스크롤이 없을때 자동으로 다음 페이지 호출하는 로직
  useEffect(() => {
    if (status === "success" && data?.pages[0].data.totalElements > 0) {
      const contentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (contentHeight <= windowHeight && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [status, data, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, scrollY);
  }, []);

  return (
    <div className={"flex flex-col items-center w-[90%] md:w-[800px]"}>
      <AddPageRouter content={"대회등록"} url={"/jeju-competition/info/add"} />
      <CompetitionStatus />
      <LoadingText
        loading={status === "pending"}
        text={"잠시만 기다려주세요."}
      />
      <LoadingText
        loading={status === "error"}
        text={"에러발생! 관리자에게 문의해주세요."}
      />
      {data?.pages[0].data.totalElements === 0 && (
        <p
          className={
            "text-red-500 mt-5 text-base sm:text-lg md:text-xl text-center"
          }
        >
          대회가 없습니다.
        </p>
      )}
      {status === "success" &&
        data?.pages.map((group: any, i: number) => (
          <React.Fragment key={i}>
            {group.data?.content.map((item: GetVideoType, i: number) => (
              <CompetitionListCard data={item} key={i} />
            ))}
          </React.Fragment>
        ))}
      <div ref={bottom} />
      <LoadingText loading={isFetchingNextPage} text={"잠시만 기다려주세요."} />
    </div>
  );
};

export default CompetitionList;
