"use client";
import React, { useState } from "react";
import { MockPost } from "@/constants/FAQData";
import { FaQuestion } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqCard = ({ data }: { data: MockPost }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={"mb-5 text-sm sm:text-base md:text-lg"}>
      {!isOpen ? (
        <div
          className={
            "flex justify-between shadow-xl rounded-lg bg-white p-5 cursor-pointer"
          }
          onClick={() => setIsOpen(true)}
        >
          <div className={"flex"}>
            <FaQuestion
              className={"mr-1.5 md:mr-2.5 text-sm sm:text-base md:text-2xl"}
            />
            <p className={"text-sm sm:text-base md:text-lg"}>{data.title}</p>
          </div>
          <div>
            <IoIosArrowDown className={"text-lg sm:text-2xl md:text-3xl"} />
          </div>
        </div>
      ) : (
        <div
          className={
            "flex flex-col shadow-xl rounded-lg bg-white p-5 cursor-pointer"
          }
          onClick={() => setIsOpen(false)}
        >
          <div
            className={
              "flex justify-between border-b border-solid border-[#D9D9D9] pb-5"
            }
          >
            <div className={"flex"}>
              <FaQuestion
                className={"mr-1.5 md:mr-2.5 text-sm sm:text-base md:text-2xl"}
              />
              <p>{data.title}</p>
            </div>
            <div>
              <IoIosArrowDown className={"text-lg sm:text-2xl md:text-3xl"} />
            </div>
          </div>
          <div className={"flex pt-5"}>
            <p className={"font-bold mr-1.5 md:mr-2.5 "}>A.</p>
            <p className={"pr-5"}>{data.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};
// <IoIosArrowUp />
export default FaqCard;
