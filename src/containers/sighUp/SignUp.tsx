"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { phoneNumHandlerWithReactHookForm } from "@/utils/PhoneNumHandlerWithReactHookForm";
import {
  FetchCheckCertificationNum,
  FetchSendCertificationEmail,
  FetchSignUp,
} from "@/services/user/signUpApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { CheckBox } from "@/components/common/checkbox/CheckBox";
import { signUpData } from "@/types/user";

const SignUp = () => {
  const [certificating, setCertificating] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isCertificate, setIsCertificate] = useState<boolean>(false);
  const [certificationNum, setCertificationNum] = useState<string>("");
  const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
  const [isHidePasswordConfirm, setIsHidePasswordConfirm] =
    useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<signUpData>();

  const onSubmit = handleSubmit(async (data) => {
    if (!isCertificate)
      await confirmAlert(
        "warning",
        "인증 미완료",
        "이메일 인증을 진행해주세요",
      );
    else {
      await FetchSignUp(data);
    }
  });

  const sendEmailHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setTimeLeft(300);
    await FetchSendCertificationEmail(getValues("email"), setCertificating);
  };

  const confirmCertificationNumHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    await FetchCheckCertificationNum(
      getValues("email"),
      certificationNum,
      setCertificating,
      setIsCertificate,
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let timer: any;
      if (certificating && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevState) => prevState - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setCertificating(false);
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [certificating, timeLeft]);
  return (
    <div
      className={
        "flex flex-col items-center w-full h-full -mt-8 sm:-mt-10 md:-mt-12 bg-[#F5F5F5]"
      }
    >
      <h1 className={"mt-20 mb-4 text-2xl font-bold"}>회원가입</h1>
      <form
        onSubmit={onSubmit}
        className={"w-[90%] md:w-[400px] flex flex-col text-[#4B4B4B]"}
      >
        <label className={"ml-5"}>이메일</label>
        <div className={"relative w-full"}>
          <input
            {...register("email")}
            type={"email"}
            disabled={isCertificate}
            className={
              "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
            }
          />
          {!isCertificate ? (
            <button
              onClick={(e) => sendEmailHandler(e)}
              className={"absolute top-6 right-2.5"}
            >
              {certificating ? "인증번호 재발송" : "인증번호 발송"}
            </button>
          ) : (
            <p className={"absolute top-6 right-2.5"}>인증완료</p>
          )}
        </div>
        {certificating && (
          <div className={"relative"}>
            <input
              type={"text"}
              maxLength={6}
              onChange={(e) => {
                setCertificationNum(e.target.value);
              }}
              placeholder={"인증번호 6자리"}
              className={
                "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
              }
            />
            <div className={"absolute top-6 right-2.5 flex"}>
              <p className={"mr-2.5"}>
                {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
              </p>
              <button onClick={(e) => confirmCertificationNumHandler(e)}>
                인증번호 확인
              </button>
            </div>
          </div>
        )}

        <label className={"ml-5"}>비밀번호</label>
        <div className={"relative"}>
          <input
            type={isHidePassword ? "password" : "text"}
            {...register("password")}
            className={
              "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
            }
          />
          {isHidePassword ? (
            <VscEye
              onClick={() => setIsHidePassword(false)}
              className={"absolute cursor-pointer top-6 right-2.5"}
              size={20}
            />
          ) : (
            <VscEyeClosed
              onClick={() => setIsHidePassword(true)}
              className={"absolute cursor-pointer top-6 right-2.5"}
              size={20}
            />
          )}
        </div>

        <label className={"ml-5"}>비밀번호 확인</label>
        <div className={"relative"}>
          <input
            type={isHidePasswordConfirm ? "password" : "text"}
            {...register("passwordConfirm")}
            className={
              "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
            }
          />
          {isHidePasswordConfirm ? (
            <VscEye
              onClick={() => setIsHidePasswordConfirm(false)}
              className={"absolute cursor-pointer top-6 right-2.5"}
              size={20}
            />
          ) : (
            <VscEyeClosed
              onClick={() => setIsHidePasswordConfirm(true)}
              className={"absolute cursor-pointer top-6 right-2.5"}
              size={20}
            />
          )}
        </div>

        <label className={"px-5 flex justify-between"}>
          <p>이름</p>
          <p className={"text-xs text-gray-600"}>*필수</p>
        </label>
        <div>
          <input
            {...register("name")}
            type={"text"}
            className={
              "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
            }
          />
        </div>

        <label className={"px-5 flex justify-between"}>
          <p>휴대폰 번호</p>
          <p className={"text-xs text-gray-600"}>*필수</p>
        </label>
        <div>
          <input
            {...register("phoneNum")}
            type={"text"}
            onChange={(e) => phoneNumHandlerWithReactHookForm(e, setValue)}
            className={
              "mt-2 mb-4 w-full h-12 rounded-2xl border-[#D9D9D9] pl-5 pr-20"
            }
          />
        </div>
        <div className={"flex ml-5 my-2.5"}>
          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            content={"개인정보 이용동의"}
          />
          <a
            href={"/file/개인정보처리방침.pdf"}
            className={"ml-2 text-blue-400"}
          >
            &lt;개인정보처리방침&gt;
          </a>
        </div>
        <button
          type={"submit"}
          className={`w-full h-12 text-white text-xl font-bold bg-black 
          mt-2.5 rounded-2xl ${!isChecked && "pointer-events-none opacity-50"}`}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
