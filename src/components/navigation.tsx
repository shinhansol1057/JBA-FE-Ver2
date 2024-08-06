"use client";
import { IoMenu } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const path = usePathname();

  return (
    <nav
      className={
        "flex items-center justify-between px-5 h-[30px] sm:h-[50px] relative " +
        (path === "/" ? "bg-[rgba(212,212,212,0.4)]" : "bg-[rgba(0,0,0,0.3)]")
      }
    >
      <h1
        lang={"en"}
        className={"text-[lg] sm:text-2xl text-white cursor-pointer "}
        onClick={() => router.push("/")}
      >
        JBA
      </h1>
      <IoMenu
        color={"white"}
        className={"cursor-pointer text-2xl sm:text-4xl"}
      />
    </nav>
  );
};

export default Navigation;
