import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col items-center pt-[20px]"}>{children}</div>
  );
}
