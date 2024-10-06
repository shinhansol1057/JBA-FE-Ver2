"use client";
import { getPostDetailType } from "@/types/PostType";
import PostContent from "@/components/common/PostContent";
import { IoMenu } from "react-icons/io5";
import React, { useState } from "react";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { usePostStore } from "@/states/PostStore";
import { useRouter, usePathname } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchDeletePost } from "@/services/PostApi";
import { useSession } from "next-auth/react";

type Props = {
  data: getPostDetailType;
};

const PostDetailInfo = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: session, status: sessionStatus } = useSession();
  const { setPostCategory } = usePostStore();
  const router = useRouter();
  const pathName = usePathname();
  const category = pathName.includes("news")
    ? "news"
    : pathName.includes("library")
      ? "library"
      : "notice";

  const deleteHandler = async () => {
    await confirmAndCancelAlertWithLoading(
      "question",
      "게시물을 삭제하겠습니까?",
      "",
      async () => await FetchDeletePost(String(data.postId), category),
    );
  };

  const updateHandler = () => {
    setPostCategory(category);
    router.push(`/post/update/${data.postId}`);
  };
  return (
    <div className={"mt-5 flex flex-col px-2 bg-white rounded-lg shadow-xl "}>
      <div
        className={
          "flex justify-between items-center border-b border-solid border-[#D9D9D9] text-[#4B4B4B] " +
          "text-sm sm:text-base md:text-lg " +
          "min-h-8 sm:min-h-10 md:min-h-14 "
        }
      >
        <div className={"flex"}>
          <p className={"ml-2"}>관리자</p>
          <p className={"mx-3"}>{data?.createAt}</p>
          <p>조회수 {data?.viewCount}</p>
        </div>
        {sessionStatus === "authenticated" ? (
          <IoMenu
            className={"text-2xl sm:text-3xl md:text-4xl cursor-pointer"}
            onClick={() => setModalOpen(true)}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <PostContent content={data?.content} />
      </div>
      <UpdateDeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteHandler={() => deleteHandler()}
        updateHandler={() => updateHandler()}
      />
    </div>
  );
};

export default PostDetailInfo;
