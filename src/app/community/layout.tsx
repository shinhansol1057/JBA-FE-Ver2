import PageTitle from "@/components/layout/PageTitle";
import Category from "@/components/layout/Category";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"커뮤니티"} />
      <Category
        category1={"NEWS"}
        category2={"자료실"}
        category3={"FAQ"}
        category1Url={"news"}
        category2Url={"library"}
        category3Url={"faq"}
        defaultUrl={"/community/"}
      />
      {children}
    </div>
  );
}
