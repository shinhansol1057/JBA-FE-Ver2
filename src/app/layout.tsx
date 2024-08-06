import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template:"제주특별자치도농구협회 | %s",
    default: "제주특별자치도농구협회",
  },
  keywords: ["제주", "농구", "제주농구", "JBA", "제주특별자치도", "제주도", "농구협회", "제주특별자치도농구협회"],
  description: "제주특별자치도 농구협회 홈페이지입니다.",
  icons: {
    icon: "/logo.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <Navigation />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
