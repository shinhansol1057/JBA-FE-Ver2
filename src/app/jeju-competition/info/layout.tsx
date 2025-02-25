import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "대회정보",
  keywords: ["제주특별자치도농구협회 대회정보"],
  description: "제주특별자치도농구협회 대회정보입니다.",
  icons: {
    icon: "/image/logo.jpeg",
  },
  openGraph: {
    title: "대회정보",
    description: "제주특별자치도농구협회 대회정보입니다.",
    images: [
      {
        url: "/image/logo.jpeg",
        width: 500,
        height: 500,
        alt: "logo",
      },
    ],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex justify-center">{children}</div>;
}
