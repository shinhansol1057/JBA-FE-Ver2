import PageTitle from "@/components/layout/PageTitle";
import Category from "@/components/layout/Category";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"마이페이지"} url={"/user/my-page"} />
      <Category
        category1={"내정보"}
        category1Url={"my-page"}
        category2={"참가신청 기록"}
        category2Url={"my-participation"}
        defaultUrl={"/user/"}
      />
      {children}
    </div>
  );
}
