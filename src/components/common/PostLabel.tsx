import React from "react";

const PostLabel = ({ content }: { content: string }) => {
  return (
    <div className={"mb-1.5 md:mb-2.5 ml-2.5 md:ml-4 "}>
      <label className={"font-bold text-sm sm:text-base md:text-lg "}>
        {content}
      </label>
    </div>
  );
};

export default PostLabel;
