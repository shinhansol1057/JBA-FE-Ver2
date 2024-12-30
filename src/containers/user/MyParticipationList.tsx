"use client";
import React, { useEffect, useRef, useState } from "react";
import Category from "@/components/layout/Category";
import { useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useObserver } from "@/hooks/useObserver";
import LoadingText from "@/components/common/LoadingText";
import { FetchGetMyParticipationList } from "@/services/participationApi";
import MyParticipationCard from "@/containers/jejuCompetition/participation/MyParticipationCard";
import { queryKeys } from "@/constants";
import { ParticipationCardType } from "@/types/participationType";

const MyParticipationList = () => {
  const bottom = useRef(null);
  const [nextCursor, setNextCursor] = useState<string>("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKeys.GET_MY_COMPETITION_PARTICIPATION_LIST, nextCursor],
      queryFn: FetchGetMyParticipationList,
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.hasNext === false) {
          return undefined;
        } else {
          return lastPage?.data?.data?.nextCursorId;
        }
      },
    });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    threshold: 0.1,
  });
  console.log(data);

  // 스크롤이 없을때 자동으로 다음 페이지 호출하는 로직
  useEffect(() => {
    if (
      status === "success" &&
      data?.pages[0].data.data.currentScrollItems.length > 0
    ) {
      const contentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (contentHeight <= windowHeight && hasNextPage) {
        fetchNextPage();
      }
      setNextCursor(data?.pages[0].data.data.nextCursor);
    }
  }, [status, data, hasNextPage, fetchNextPage]);
  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, scrollY);
  }, []);
  return (
    <div className={"w-full flex flex-col items-center"}>
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
          참가신청 내역이 없습니다.
        </p>
      )}
      <div className={"w-[90%] flex flex-col md:w-[800px] mt-4"}>
        {data?.pages.map((page, i: number) => (
          <React.Fragment key={`participation - ${i}`}>
            {page.data.data.currentScrollItems.map(
              (item: ParticipationCardType) => (
                <MyParticipationCard
                  key={item.participationCompetitionId}
                  id={item.participationCompetitionId}
                  title={item.competitionName}
                  applicationDate={item.applicantDate}
                  applicationStartDate={item.participationStartDate}
                  applicationEndDate={item.participationEndDate}
                  division={item.divisionName}
                />
              ),
            )}
          </React.Fragment>
        ))}
      </div>
      <div ref={bottom} />
      <LoadingText loading={isFetchingNextPage} text={"잠시만 기다려주세요."} />
    </div>
  );
};

export default MyParticipationList;
