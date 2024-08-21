"use client";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";

const Post = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const OFFSET = 5;

  const getPostList = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY +
        `/v1/api/competition?status=ALL&year=2024&page=${pageParam}&size=${OFFSET}`,
    );
    return res.json();
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["getPostList"],
    queryFn: getPostList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.last) {
        return undefined;
      } else {
        return lastPage.data.pageable.pageNumber + 1;
      }
    },
  });
  console.log(data);

  return (
    <div>
      <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
      {status === "pending" && <p>불러오는 중</p>}
      {status === "success" &&
        data?.pages.map((group: any, i: number) => (
          <React.Fragment key={i}>
            {group.data?.content.map((item: any) => (
              <p key={item.postId}>{item.title}</p>
            ))}
          </React.Fragment>
        ))}
      <button onClick={() => fetchNextPage()}>click</button>
    </div>
  );
};

export default Post;
