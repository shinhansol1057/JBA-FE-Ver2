"use client";
import React from "react";
import style from "./CheckBox.module.css";

type Props = {
  isChecked: boolean;
  setIsChecked: (value: ((prevState: boolean) => boolean) | boolean) => void;
  content: string;
};
export const CheckBox = ({ isChecked, setIsChecked, content }: Props) => {
  return (
    <div className={style.checkbox}>
      <input
        id="check"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <label className="checkbox-label" htmlFor="check">
        {content}
      </label>
    </div>
  );
};
