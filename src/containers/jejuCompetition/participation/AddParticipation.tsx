"use client";

import React, { useState } from "react";
import PostTitle from "@/components/common/PostTitle";
import CompetitionLabel from "@/components/competition/CompetitionLabel";
import style from "@/components/common/checkbox/CheckBox.module.css";
import AddAttachedFileBox from "@/components/common/AddAttachedFileBox";
import CancelBtn from "@/components/common/CancelBtn";
import { useRouter } from "next/navigation";
import AddBtn from "@/components/common/AddBtn";
import { FetchPostParticipation } from "@/services/participationApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { addHyphenToPhoneNum } from "@/utils/PhoneNumHandlerWithReactHookForm";
import {
  CompetitionDetailType,
  DivisionResponseType,
} from "@/types/competitionType";

type Props = {
  id: string;
  detailData: CompetitionDetailType;
};
const AddParticipation = ({ id, detailData }: Props) => {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const submitHandler = async () => {
    if (!selectedDivision) {
      await confirmAlert("warning", "종별을 선택해주세요.");
      return;
    }
    return await FetchPostParticipation(
      selectedDivision,
      name,
      phoneNum,
      email,
      files,
      router,
      id,
    );
  };
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
            {detailData?.divisions.map(
              (item: DivisionResponseType, i: number) => (
                <div className={style.checkbox} key={i}>
                  <input
                    id={`check-${i}`}
                    type="checkbox"
                    checked={selectedDivision === item.divisionId}
                    onChange={(e) =>
                      setSelectedDivision(
                        e.target.checked ? item.divisionId : null,
                      )
                    }
                  />
                  <label
                    className={"text-sm md:text-lg"}
                    htmlFor={`check-${i}`}
                  >
                    {item.divisionName}
                  </label>
                </div>
              ),
            )}
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
              "pl-1 md:p-2 placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2 md:mt-4 md:text-xl"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder={"'-'는 자동으로 입력됩니다."}
            className={
              "pl-1 md:p-2 placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2  md:mt-4 md:text-xl"
            }
            value={phoneNum}
            onChange={(e) => setPhoneNum(addHyphenToPhoneNum(e.target.value))}
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
            placeholder={"이메일을 입력해주세요."}
            className={
              "pl-1 md:p-2 placeholder:text-[#B5B5B5] w-full h-4 md:h-6 text-base border-none mt-2 md:mt-4 md:text-xl"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
