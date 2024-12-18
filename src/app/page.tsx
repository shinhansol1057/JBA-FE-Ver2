import { Metadata } from "next";
import Main from "@/containers/main/Main";
import { auth } from "../../auth";

export const metadata: Metadata = {};

const Page = async () => {
  const session = await auth();
  console.log("session: ", session);

  return <Main />;
};

export default Page;
