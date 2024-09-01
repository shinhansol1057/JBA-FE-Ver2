"use client";
import { getPostDetailType } from "@/types/PostType";
import PostContent from "@/components/common/PostContent";
import { FindAdminRole } from "@/utils/JwtDecoder";
import { IoMenu } from "react-icons/io5";
import React, { useState } from "react";
import UpdateDeleteModal from "@/components/common/UpdateDeleteModal";
import { usePostStore } from "@/states/PostStore";
import { useRouter, usePathname } from "next/navigation";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchDeletePost } from "@/services/PostApi";

type Props = {
  data: getPostDetailType;
};

const PostDetailInfo = ({ data }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const isAdmin = FindAdminRole();
  const { setPostCategory } = usePostStore();
  const router = useRouter();
  const pathName = usePathname();
  const category = pathName.includes("news")
    ? "news"
    : pathName.includes("library")
      ? "library"
      : "notice";

  const deleteHandler = () => {
    confirmAndCancelAlertWithLoading(
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
    <div
      className={
        "mt-[20px] flex flex-col px-[7px] bg-white rounded-[8px] shadow-xl " +
        "w-[280px] sm:w-[400px] md:w-[800px] "
      }
    >
      <div
        className={
          "flex justify-between items-center border-b border-solid border-[#D9D9D9] text-[#4B4B4B] " +
          "text-[10px] sm:text-[12px] md:text-[16px] " +
          "min-h-[30px] sm:min-h-[40px] md:min-h-[50px] "
        }
      >
        <div className={"flex"}>
          <p className={"ml-[5px]"}>관리자</p>
          <p className={"mx-[10px]"}>{data?.createAt}</p>
          <p>조회수 {data?.viewCount}</p>
        </div>
        {isAdmin ? (
          <IoMenu
            className={
              "text-[20px] sm:text-[25px] md:text-[35px] cursor-pointer"
            }
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
