import React from "react";

const LoadingText = ({ loading }: { loading: boolean }) => {
  return (
    <div>
      {loading && (
        <p className={"mt-[20px] md:mt-[40px] text-red-500"}>
          잠시만 기다려주세요.
        </p>
      )}
    </div>
  );
};

export default LoadingText;
