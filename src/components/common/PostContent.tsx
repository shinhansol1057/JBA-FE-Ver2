"use client";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const PostContent = ({ content }: { content: string }) => {
  const [cleanHtml, setCleanHtml] = useState<string>("");
  useEffect(() => {
    const html = DOMPurify.sanitize(content);
    setCleanHtml(html);
  }, [content]);
  return (
    <div
      className={
        "text-sm sm:text-base md:text-lg " +
        "pl-1.5 py-5 " +
        "min-h-[150px] sm:min-h-[200px] md:min-h-[300px] "
      }
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default PostContent;
