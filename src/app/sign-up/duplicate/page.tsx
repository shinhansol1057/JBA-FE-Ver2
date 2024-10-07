import React, { Suspense } from "react";
import SignUpDuplicate from "@/containers/sighUp/SignUpDuplicate";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpDuplicate />
    </Suspense>
  );
};

export default Page;
