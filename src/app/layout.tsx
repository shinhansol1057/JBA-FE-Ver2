import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/containers/navigation/navigation";
import ReactQueryProviders from "@/hooks/useReactQuery";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width, initial-scale=1.0",
};

export const metadata: Metadata = {
  title: {
    template: "제주특별자치도농구협회 | %s",
    default: "제주특별자치도농구협회",
  },
  keywords: [
    "제주",
    "농구",
    "제주농구",
    "JBA",
    "제주특별자치도",
    "제주도",
    "농구협회",
    "제주특별자치도농구협회",
  ],
  description: "제주특별자치도 농구협회 홈페이지입니다.",
  icons: {
    icon: "/image/logo.jpeg",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <div className={"min-h-[100vh]"}>
          <Navigation />
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </div>
      </body>
    </html>
  );
}
