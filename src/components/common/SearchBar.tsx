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
        "w-full h-8 sm:h-10 md:h-12 " +
        "border border-solid border-borderColor relative rounded-lg shadow-lg"
      }
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={
          "border-none h-full w-full rounded-lg " +
          "text-sm sm:text-base md:text-lg pl-5 pr-10"
        }
      />
      <IoSearchSharp
        className={
          "cursor-pointer absolute " +
          "text-base sm:text-xl md:text-3xl " +
          "top-2 sm:top-2.5 md:top-2.5 " +
          "right-2.5 sm:right-3 md:right-3.5 "
        }
      />
    </div>
  );
};

export default SearchBar;
