import React from "react";

const PostLabel = ({ content }: { content: string }) => {
  return (
    <div className={"mb-[5px] md:mb-[10px] ml-[10px] md:ml-[15px] "}>
      <label
        className={"font-bold " + "text-[12px] sm:text-[14px] md:text-[18px] "}
      >
        {content}
      </label>
    </div>
  );
};

export default PostLabel;
