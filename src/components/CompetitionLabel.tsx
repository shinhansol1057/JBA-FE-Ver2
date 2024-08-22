import React from "react";

type Props = {
  content: string;
  color: string;
  bold: boolean;
};
const CompetitionLabel = ({ content, color, bold }: Props) => {
  return (
    <p
      className={
        "w-[45px] sm:w-[55px] md:w-[70px] " +
        "text-[10px] sm:text-[12px] md:text-[16px] " +
        "ml-[3px] " +
        (bold && "font-bold ") +
        color
      }
    >
      {content}
    </p>
  );
};

export default CompetitionLabel;
