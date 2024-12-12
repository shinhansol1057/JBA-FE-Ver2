import PageTitle from "@/components/layout/PageTitle";
import Category from "@/components/layout/Category";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"마이페이지"} url={"/user/my-page"} />
      {children}
    </div>
  );
}
