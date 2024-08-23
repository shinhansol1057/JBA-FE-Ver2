import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

type Props = {
  searchKey: string;
  setSearchKey: (value: ((prevState: string) => string) | string) => void;
};
const SearchBar = ({ searchKey, setSearchKey }: Props) => {
  const [inputValue, setInputValue] = useState<string>(searchKey);

  useEffect(() => {
    // 타이핑 후 0.5초 기다렸다가 setSearchKey 호출
    const handler = setTimeout(() => {
      setSearchKey(inputValue);
    }, 500);

    // 컴포넌트가 언마운트되거나 inputValue가 변경되면 타이머를 초기화
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchKey]);
  return (
    <div
      className={
        "w-[280px] sm:w-[400px] md:w-[800px] " +
        "h-[30px] sm:h-[40px] md:h-[50px] " +
        "border border-solid border-borderColor relative rounded-[8px] shadow-lg"
      }
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={
          "border-none h-full w-full rounded-[8px] " +
          "text-[12px] sm:text-[14px] md:text-[16px] pl-[20px] pr-[40px]"
        }
      />
      <IoSearchSharp
        className={
          "cursor-pointer absolute " +
          "text-[15px] sm:text-[20px] md:text-[30px] " +
          "top-[7px] sm:top-[10px] md:top-[10px] " +
          "right-[10px] sm:right-[12px] md:right-[14px] "
        }
      />
    </div>
  );
};

export default SearchBar;
