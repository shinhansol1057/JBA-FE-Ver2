import PageTitle from "@/components/layout/PageTitle";
import Category from "@/components/layout/Category";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <PageTitle title={"미디어센터"} url={"/media/gallery"} />
      <Category
        category1={"갤러리"}
        category2={"대회영상"}
        category1Url={"gallery"}
        category2Url={"video"}
        defaultUrl={"/media/"}
      />
      {children}
    </div>
  );
}
