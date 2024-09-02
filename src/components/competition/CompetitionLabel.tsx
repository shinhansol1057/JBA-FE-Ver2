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
        (long
          ? "w-[45px] sm:w-[55px] md:w-[70px] "
          : "w-[30px] sm:w-[35px] md:w-[50px] ") +
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
