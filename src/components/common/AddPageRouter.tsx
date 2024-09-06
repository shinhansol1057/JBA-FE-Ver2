import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
  content: string;
  url: string;
  onClick?: any;
};
const AddPageRouter = ({ content, url, onClick }: Props) => {
  const { data: session, status: sessionStatus } = useSession();
  return (
    <div className={"flex justify-end mb-[10px] w-full"}>
      {sessionStatus === "authenticated" ? (
        <Link
          href={url}
          className={
            "flex justify-center items-center font-bold rounded-[8px] bg-black text-white " +
            "text-[12px] sm:text-[14px] md:text-[18px] " +
            "w-[60px] sm:w-[80px] md:w-[100px] " +
            "h-[30px] sm:h-[30px] md:h-[50px]"
          }
          onClick={() => onClick && onClick()}
        >
          {content}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddPageRouter;
