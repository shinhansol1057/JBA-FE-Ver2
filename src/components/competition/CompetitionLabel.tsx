import React from "react";

type Props = {
  content: string;
  color: string;
  bold: boolean;
  long: boolean;
};
const CompetitionLabel = ({ content, color, bold, long }: Props) => {
  return (
    <p
      className={
        "text-sm sm:text-base md:text-lg " +
        "px-1 md:px-2 whitespace-nowrap " +
        (bold ? "font-bold " : "") +
        (long ? "w-16 sm:w-20  md:w-24 " : "") +
        color
      }
    >
      {content}
    </p>
  );
};

export default CompetitionLabel;
