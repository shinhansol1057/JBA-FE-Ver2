"use client";
import React, { useState } from "react";
import { MockPost } from "@/constants/FAQData";
import { FaQuestion } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FaqCard = ({ data }: { data: MockPost }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={"mb-[20px]"}>
      {!isOpen ? (
        <div
          className={
            "flex justify-between shadow-xl rounded-[8px] bg-white p-[20px] cursor-pointer"
          }
          onClick={() => setIsOpen(true)}
        >
          <div className={"flex w-[240px]"}>
            <FaQuestion
              className={
                "mr-[5px] md:mr-[10px] text-[12px] sm:text-[15px] md:text-[25px]"
              }
            />
            <p
              className={
                "text-[10px] sm:text-[12px] md:text-[16px] leading-3 sm:leading-4 md:leading-5"
              }
            >
              {data.title}
            </p>
          </div>
          <div className={"w-[20px]"}>
            <IoIosArrowDown
              className={"text-[15px] sm:text-[20px] md:text-[30px]"}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            "flex flex-col shadow-xl rounded-[8px] bg-white p-[20px] cursor-pointer"
          }
          onClick={() => setIsOpen(false)}
        >
          <div
            className={
              "flex justify-between border-b border-solid border-[#D9D9D9] pb-[20px]"
            }
          >
            <div className={"flex "}>
              <FaQuestion
                className={
                  "mr-[5px] md:mr-[10px] text-[12px] sm:text-[15px] md:text-[25px]"
                }
              />
              <p
                className={
                  "text-[10px] sm:text-[12px] md:text-[16px] leading-3 sm:leading-4 md:leading-5"
                }
              >
                {data.title}
              </p>
            </div>
            <div className={"w-[20px]"}>
              <IoIosArrowDown
                className={"text-[15px] sm:text-[20px] md:text-[30px]"}
              />
            </div>
          </div>
          <div className={"flex pt-[20px]"}>
            <p
              className={
                "font-bold mr-[5px] md:mr-[10px] text-[12px] sm:text-[14px] md:text-[20px]"
              }
            >
              A.
            </p>
            <p
              className={
                "text-[10px] sm:text-[12px] md:text-[16px] leading-3 sm:leading-4 md:leading-5 pr-[20px]"
              }
            >
              {data.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
// <IoIosArrowUp />
export default FaqCard;
