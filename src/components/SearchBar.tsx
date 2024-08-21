import React from "react";
import { IoSearchSharp } from "react-icons/io5";

type Props = {
  searchKey: string;
  setSearchKey: (value: ((prevState: string) => string) | string) => void;
};
const SearchBar = ({ searchKey, setSearchKey }: Props) => {
  return (
    <div
      className={
        "w-[280px] h-[30px] border border-solid border-borderColor relative rounded-[8px] shadow-lg"
      }
    >
      <input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className={
          "border-none h-full w-full rounded-[8px] text-[12px] pl-[20px] pr-[40px]"
        }
      />
      <IoSearchSharp
        className={"cursor-pointer absolute top-[7px] right-[10px]"}
      />
    </div>
  );
};

export default SearchBar;
