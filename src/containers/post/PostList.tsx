"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchGetPostList } from "@/services/PostApi";
import { getPostListItemType } from "@/types/PostType";
import LoadingText from "@/components/common/LoadingText";
import { useObserver } from "@/hooks/useObserver";
import PostListCard from "@/containers/post/PostListCard";
import { headers } from "next/headers";
import { usePathname } from "next/navigation";
import AddPageRouter from "@/components/common/AddPageRouter";
import { usePostStore } from "@/states/PostStore";

const PostList = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const bottom = useRef(null);
  const path = usePathname();
  const parts = path.split("/");
  const category = parts[2] === "announcement" ? "notice" : parts[2];
  const { setPostCategory } = usePostStore();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["getPostList", category, searchKey],
    queryFn: FetchGetPostList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (
        !lastPage.data.totalPages ||
        lastPage?.data?.totalPages === lastPageParam + 1
      ) {
        // lastPage 가 마지막 페이지였다면 api 호출을 하지 않는다.
        return undefined;
      } else {
        return lastPageParam + 1; // 다음 페이지 리턴
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
    <div>
      <AddPageRouter
        content={"게시물등록"}
        url={"/post/add"}
        onClick={() => setPostCategory(category)}
      />
      <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
      <LoadingText
        loading={status === "error"}
        text={"에러발생! 관리자에게 문의해주세요."}
      />
      <LoadingText
        loading={status === "pending"}
        text={"잠시만 기다려주세요."}
      />
      {data?.pages[0]?.data?.totalPosts === 0 && (
        <p
          className={
            "text-red-500 mt-[20px] text-[12px] sm:text-[14px] md:text-[20px]"
          }
        >
          게시물이 없습니다.
        </p>
      )}
      <div className={"mt-[30px] sm:mt-[40px] md:mt-[50px] "}>
        {status === "success" &&
          data?.pages.map((group: any, i: number) => (
            <React.Fragment key={i}>
              {group.data?.posts.map((item: getPostListItemType) => (
                <PostListCard
                  data={item}
                  key={item.postId}
                  category={category}
                />
              ))}
            </React.Fragment>
          ))}
      </div>
      <div ref={bottom} />
      <LoadingText loading={isFetchingNextPage} text={"잠시만 기다려주세요."} />
    </div>
  );
};

export default PostList;
