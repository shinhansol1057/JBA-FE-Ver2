"use client";

import React, { useEffect, useRef } from "react";
import CompetitionStatus from "@/containers/jejuCompetition/list/CompetitionStatus";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchGetCompetitionList } from "@/services/CompetitionApi";
import CompetitionListCard from "@/containers/jejuCompetition/list/CompetitionListCard";
import { useObserver } from "@/hooks/useObserver";
import LoadingText from "@/components/common/LoadingText";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { getVideoType } from "@/types/VideoType";
import VideoListCard from "@/containers/video/VideoListCard";
import AddBtn from "@/components/common/AddBtn";
import { useRouter } from "next/navigation";
import { FindAdminRole } from "@/utils/JwtDecoder";

const CompetitionList = () => {
  const router = useRouter();
  const isAdmin = typeof window !== "undefined" && FindAdminRole();
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
    <div className={"flex flex-col items-center"}>
      {isAdmin ? (
        <div className={"flex justify-end mb-[10px] w-full"}>
          <button
            className={
              "font-bold rounded-[8px] bg-black text-white " +
              "text-[12px] sm:text-[14px] md:text-[18px] " +
              "w-[60px] sm:w-[80px] md:w-[100px] " +
              "h-[30px] sm:h-[30px] md:h-[50px]"
            }
            onClick={() => router.push("/jeju-competition/info/add")}
          >
            대회등록
          </button>
        </div>
      ) : (
        ""
      )}
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
            "text-red-500 mt-[20px] text-[12px] sm:text-[14px] md:text-[20px]"
          }
        >
          대회가 없습니다.
        </p>
      )}
      {status === "success" &&
        data?.pages.map((group: any, i: number) => (
          <React.Fragment key={i}>
            {group.data?.content.map((item: getVideoType, i: number) => (
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
