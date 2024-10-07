"use client";
import React from "react";
import PageTitle from "@/components/layout/PageTitle";
import MyPageRow from "@/containers/user/MyPageRow";
import { useQuery } from "@tanstack/react-query";
import { FetchGetUserInfo } from "@/services/user/UserApi";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MyPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { data } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => await FetchGetUserInfo(),
    select: (result) => result?.data.data,
    enabled: sessionStatus === "authenticated",
  });
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"마이페이지"} url={"/user/my-page"} />
      {data && (
        <div
          className={
            "mt-7 bg-white border border-solid border-borderColor shadow-xl rounded-lg " +
            "w-[90%] md:w-[800px] " +
            "p-2.5 md:p-5 " +
            "grid grid-cols-1 gap-2.5 md:gap-5"
          }
        >
          <MyPageRow
            label={"이름(권한)"}
            value={`${data?.name}(${data?.role})`}
          />
          <MyPageRow label={"이메일"} value={data?.email} />
          <MyPageRow label={"휴대폰번호"} value={data?.phoneNum} />
        </div>
      )}
      <div
        className={
          `w-[90%] md:w-[800px] ${!data?.isSocial && "grid grid-cols-2 gap-2.5 md:gap-5"} mt-5 ` +
          "text-sm sm:text-base md:text-lg"
        }
      >
        <Link
          href={"/user/my-page/update"}
          className={
            "flex justify-center items-center font-bold rounded-lg " +
            "bg-[#D9D9D9] hover:bg-black text-[#4B4B4B] hover:text-white " +
            "h-10 sm:h-12 md:h-14"
          }
        >
          프로필 편집
        </Link>
        {!data?.isSocial && (
          <Link
            href={"/user/my-page/update/password"}
            className={
              "flex justify-center items-center font-bold rounded-lg " +
              "bg-[#D9D9D9] hover:bg-black text-[#4B4B4B] hover:text-white " +
              "h-10 sm:h-12 md:h-14 "
            }
          >
            비밀번호 변경
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyPage;
