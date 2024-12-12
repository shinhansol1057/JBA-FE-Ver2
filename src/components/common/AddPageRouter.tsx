import React from "react";
import Link from "next/link";
import { useIsAdmin } from "@/hooks/useIsAdmin";

type Props = {
  content: string;
  url: string;
  onClick?: any;
};
const AddPageRouter = ({ content, url, onClick }: Props) => {
  const isAdmin = useIsAdmin();
  return (
    <div className={"flex justify-end mb-2.5 w-full"}>
      {isAdmin && (
        <Link
          href={url}
          className={
            "flex justify-center items-center font-bold rounded-lg bg-black text-white " +
            "text-sm sm:text-base md:text-xl " +
            "w-16 sm:w-20 md:w-24 " +
            "h-10 md:h-14"
          }
          onClick={() => onClick && onClick()}
        >
          {content}
        </Link>
      )}
    </div>
  );
};

export default AddPageRouter;
