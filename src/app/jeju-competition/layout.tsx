import PageTitle from "@/components/layout/PageTitle";
import Category from "@/components/layout/Category";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"제주대회"} url={"/jeju-competition/info"} />
      <Category
        category1={"대회정보"}
        category1Url={"info"}
        defaultUrl={"/jeju-competition/"}
      />
      {children}
    </div>
  );
}
