import { Metadata } from "next";
import Main from "@/containers/main/Main";

export const metadata: Metadata = {};

export const dynamic = "force-dynamic"; // SSG/캐시 영향 제거
export const runtime = "nodejs";
const Page = async () => {
  return <Main />;
};

export default Page;
