"use client";
import { getVideoList } from "@/services/VideoApi";
import { useObserver } from "@/hooks/useObserver";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingText from "@/components/common/LoadingText";
import SearchBar from "@/components/common/SearchBar";
import VideoListCard from "@/containers/video/VideoListCard";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";

const VideoList = () => {
  useAxiosInterceptor();
  const bottom = useRef(null);
  const [keyword, setKeyword] = useState<string>("");
  const isOfficial: string = "false";
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["getVideoList", keyword, isOfficial],
      queryFn: getVideoList,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
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
    if (status === "success" && data?.pages[0].data.totalGalleries > 0) {
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
      <SearchBar searchKey={keyword} setSearchKey={setKeyword} />
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
          영상이 없습니다.
        </p>
      )}
      <div className={"flex flex-col mt-[20px] md:mt-[40px]"}>
        {status === "success" &&
          data?.pages.map((group: any, i: number) => (
            <React.Fragment key={i}>
              {group.data?.content.map((item: any) => (
                <VideoListCard data={item} key={item.videoId} />
              ))}
            </React.Fragment>
          ))}
      </div>

      <div ref={bottom} />
      <LoadingText loading={isFetchingNextPage} text={"잠시만 기다려주세요."} />
    </div>
  );
};

export default VideoList;
