import { Metadata } from "next";
import Main from "@/containers/main/Main";

export const metadata: Metadata = {};

const Page = async () => {
  return <Main />;
};

export default Page;
