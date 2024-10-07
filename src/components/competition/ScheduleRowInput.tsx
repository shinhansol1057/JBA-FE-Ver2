import React from "react";

type Props = {
  value: any;
  setValue: any;
  type: string;
  placeHolder?: string;
};
const ScheduleRowInput = ({ value, setValue, type, placeHolder }: Props) => {
  return (
    <input
      type={type}
      className={"border-none rounded-md p-1.5 w-full"}
      value={value}
      onChange={(e) => setValue(e)}
      placeholder={placeHolder}
    />
  );
};

export default ScheduleRowInput;
