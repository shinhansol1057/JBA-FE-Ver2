import React from "react";

const LoadingText = ({ loading, text }: { loading: boolean; text: string }) => {
  return (
    <div>
      {loading && (
        <p className={"mt-[20px] md:mt-[40px] text-red-500 text-center"}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingText;
