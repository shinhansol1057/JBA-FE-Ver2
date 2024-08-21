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
        "w-[35px] text-[10px] " + "ml-[3px] " + (bold && "font-bold ") + color
      }
    >
      {content}
    </p>
  );
};

export default CompetitionLabel;
