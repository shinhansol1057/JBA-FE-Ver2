"use client";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGalleryList } from "@/services/GalleryApi";
import SearchBar from "@/components/common/SearchBar";

const GalleryList = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["getGalleryList", keyword],
    queryFn: getGalleryList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage?.data.totalPages === lastPageParam + 1) {
        // lastPage 가 마지막 페이지였다면 api 호출을 하지 않는다.
        return undefined;
      } else {
        return lastPageParam + 1; // 다음 페이지 리턴
      }
    },
  });
  console.log(data);
  return (
    <div className={"w-[280px] sm:w-[400px] md:w-[800px]"}>
      <SearchBar searchKey={keyword} setSearchKey={setKeyword} />
      {data?.pages.map((group: any, i: number) => {
        return group.data.galleries.map((item) => {
          return <p key={item.galleryId}>{item.title}</p>;
        });
      })}
      <button onClick={() => fetchNextPage()} className={"text-[50px]"}>
        +
      </button>
    </div>
  );
};

export default GalleryList;
