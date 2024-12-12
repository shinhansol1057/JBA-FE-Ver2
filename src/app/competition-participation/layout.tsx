import Category from "@/components/layout/Category";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center"}>
      <h3
        className={
          "text-xl sm:text-2xl md:text-3xl font-bold mt-[20px] md:mt-[30px]"
        }
      >
        참가신청
      </h3>
      {children}
    </div>
  );
}
