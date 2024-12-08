"use client";

import React, { useState } from "react";
import PostTitle from "@/components/common/PostTitle";
import { useQuery } from "@tanstack/react-query";
import { FetchGetCompetitionDetail } from "@/services/CompetitionApi";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import style from "@/components/common/checkbox/CheckBox.module.css";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/common/AddBtn";

const AddParticipation = ({ id }: { id: string }) => {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<String>("");
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const { data: detailData } = useQuery({
    queryKey: ["competitionDetail", id],
    queryFn: () => FetchGetCompetitionDetail(id),
    select: (result) => result?.data.data,
  });

  const submitHandler = () => {
    router.push("/competition-participation-complete");
  };

  console.log(detailData);
  console.log(selectedDivision);
  return (
    <div className={"my-2.5 md:my-5 w-[90%] md:w-[800px]"}>
      <PostTitle title={detailData?.title} />
      <div className={"bg-white w-full min-h-40 rounded-lg mt-5 p-2.5"}>
        <div>
          <CompetitionLabel
            content={"종별"}
            color={""}
            long={false}
            bold={true}
          />
          <div
            className={
              "grid grid-cols-3 gap-4 py-4 border-solid border-b-[1px] border-[#D9D9D9]"
            }
          >
            {detailData?.divisions.map((item: string, i: number) => (
              <div className={style.checkbox} key={i}>
                <input
                  id={`check-${i}`}
                  type="checkbox"
                  checked={selectedDivision === item}
                  onChange={(e) =>
                    setSelectedDivision(e.target.checked ? item : "")
                  }
                />
                <label className={"text-sm md:text-lg"} htmlFor={`check-${i}`}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={"py-2.5 border-solid border-b-[1px] border-[#D9D9D9]"}>
          <CompetitionLabel
            content={"이름"}
            color={""}
            bold={true}
            long={true}
          />
          <input
            type={"text"}
            placeholder={"이름을 입력해주세요."}
            className={
              "placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2 md:mt-4 md:text-xl"
            }
          />
        </div>
        <div className={"py-2.5 border-solid border-b-[1px] border-[#D9D9D9]"}>
          <CompetitionLabel
            content={"휴대폰 번호"}
            color={""}
            bold={true}
            long={true}
          />
          <input
            type={"text"}
            placeholder={"'-'를 제외하고 입력해주세요."}
            className={
              "placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2  md:mt-4 md:text-xl"
            }
          />
        </div>
        <div className={"py-2.5 border-solid border-b-[1px] border-[#D9D9D9]"}>
          <CompetitionLabel
            content={"이메일"}
            color={""}
            bold={true}
            long={true}
          />
          <input
            type={"email"}
            placeholder={"이메일을 입력해주세요"}
            className={
              "placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2 md:mt-4 md:text-xl"
            }
          />
        </div>
      </div>
      <AddAttachedFileBox files={files} setFiles={setFiles} />
      <div className={"grid grid-cols-2 gap-4 mb-4"}>
        <CancelBtn handler={() => router.back()} />
        <AddBtn handler={() => submitHandler()} text={"신청"} />
      </div>
    </div>
  );
};

export default AddParticipation;
