import React from "react";

type Props = {
  content: string;
  color: string;
  bold: boolean;
  long?: boolean;
};
const CompetitionLabel = ({ content, color, bold, long }: Props) => {
  return (
    <p
      className={
        // (long ? "w-16 sm:w-20  md:w-24 " : "w-9 sm:w-11 md:w-13 ") +
        "text-sm sm:text-base md:text-lg " +
        "px-2 whitespace-nowrap " +
        (bold && "font-bold ") +
        color
      }
    >
      {content}
    </p>
  );
};

export default CompetitionLabel;
