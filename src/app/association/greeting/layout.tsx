import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회장인사말",
  keywords: ["제주특별자치도농구협회 회장인사말"],
  description: "제주특별자치도농구협회 회장인사말입니다.",
  icons: {
    icon: "/image/logo.jpeg",
  },
  openGraph: {
    title: "회장인사말",
    description: "제주특별자치도농구협회 회장인사말입니다.",
    images: [
      {
        url: "/image/회장님 사진1.jpeg",
        width: 500,
        height: 500,
        alt: "greeting",
      },
    ],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex justify-center">{children}</div>;
}
