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
      {data ? (
        <div
          className={
            "mt-[30px] bg-white border border-solid border-borderColor shadow-xl rounded-[8px] " +
            "w-[280px] sm:w-[400px] md:w-[800px] " +
            "p-[10px] md:p-[20px] " +
            "grid grid-cols-1 gap-[10px] md:gap-[20px]"
          }
        >
          <MyPageRow
            label={"이름(권한)"}
            value={`${data?.name}(${data?.role})`}
          />
          <MyPageRow label={"이메일"} value={data?.email} />
          <MyPageRow label={"휴대폰번호"} value={data?.phoneNum} />
        </div>
      ) : (
        ""
      )}
      <div className={"grid grid-cols-2 gap-[10px] md:gap-[20px] mt-[20px]"}>
        <Link
          href={"/user/my-page/update"}
          className={
            "flex justify-center items-center font-bold rounded-[8px] bg-[#D9D9D9] hover:bg-black text-[#4B4B4B] hover:text-white " +
            "text-[12px] sm:text-[14px] md:text-[18px] " +
            "w-[135px] sm:w-[195px] md:w-[390px] " +
            "h-[30px] sm:h-[30px] md:h-[50px]"
          }
        >
          프로필 편집
        </Link>
        <Link
          href={"/user/my-page/update/password"}
          className={
            "flex justify-center items-center font-bold rounded-[8px] bg-[#D9D9D9] hover:bg-black text-[#4B4B4B] hover:text-white " +
            "text-[12px] sm:text-[14px] md:text-[18px] " +
            "w-[135px] sm:w-[195px] md:w-[390px] " +
            "h-[30px] sm:h-[30px] md:h-[50px] "
          }
        >
          비밀번호 변경
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
