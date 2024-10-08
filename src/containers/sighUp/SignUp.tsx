"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpData } from "@/constants/sighUp";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import PhoneNumHandler from "@/utils/PhoneNumHandler";
import {
  FetchCheckCertificationNum,
  FetchSendCertificationEmail,
  FetchSignUp,
} from "@/services/user/SignUpApi";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { CheckBox } from "@/components/common/checkbox/CheckBox";

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

  const sendEmailHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setTimeLeft(300);
    FetchSendCertificationEmail(getValues("email"), setCertificating);
  };

  const confirmCertificationNumHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    FetchCheckCertificationNum(
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
        "flex flex-col items-center w-full h-[100vh] -mt-[30px] sm:-mt-[40px] md:-mt-[50px] bg-[#F5F5F5]"
      }
    >
      <h1
        className={
          "mt-[80px] sm:mt-[90px] md:mt-[100px] mb-[15px] text-[16px] font-bold"
        }
      >
        회원가입
      </h1>
      <form
        onSubmit={onSubmit}
        className={"w-[280px] text-[12px] flex flex-col"}
      >
        <label className={"ml-[20px] leading-[16px]"}>이메일</label>
        <div className={"relative "}>
          <input
            {...register("email")}
            type={"email"}
            disabled={isCertificate}
            className={
              "mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[90px]"
            }
          />
          {!isCertificate ? (
            <button
              onClick={(e) => sendEmailHandler(e)}
              className={"absolute top-[20px] right-[10px]"}
            >
              {certificating ? "인증번호 재발송" : "인증번호 발송"}
            </button>
          ) : (
            <p className={"absolute top-[20px] right-[10px]"}>인증완료</p>
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
                "mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[100px]"
              }
            />
            <div className={"absolute top-[20px] right-[10px] flex"}>
              <p className={"mr-[10px]"}>
                {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
              </p>
              <button onClick={(e) => confirmCertificationNumHandler(e)}>
                인증번호 확인
              </button>
            </div>
          </div>
        )}

        <label className={"ml-[20px] leading-[16px] mb-[5px]"}>비밀번호</label>
        <div className={"relative"}>
          <input
            type={isHidePassword ? "password" : "text"}
            {...register("password")}
            className={
              '"mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[90px]'
            }
          />
          {isHidePassword ? (
            <VscEye
              onClick={() => setIsHidePassword(false)}
              className={"absolute cursor-pointer top-[10px] right-[10px]"}
              size={20}
            />
          ) : (
            <VscEyeClosed
              onClick={() => setIsHidePassword(true)}
              className={"absolute cursor-pointer top-[10px] right-[10px]"}
              size={20}
            />
          )}
        </div>

        <label className={"ml-[20px] leading-[16px] mb-[5px]"}>
          비밀번호 확인
        </label>
        <div className={"relative"}>
          <input
            type={isHidePasswordConfirm ? "password" : "text"}
            {...register("passwordConfirm")}
            className={
              '"mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[50px]'
            }
          />
          {isHidePasswordConfirm ? (
            <VscEye
              onClick={() => setIsHidePasswordConfirm(false)}
              className={"absolute cursor-pointer top-[10px] right-[10px]"}
              size={20}
            />
          ) : (
            <VscEyeClosed
              onClick={() => setIsHidePasswordConfirm(true)}
              className={"absolute cursor-pointer top-[10px] right-[10px]"}
              size={20}
            />
          )}
        </div>

        <label className={"ml-[20px] leading-[16px] mb-[5px]"}>이름</label>
        <div>
          <input
            {...register("name")}
            type={"text"}
            className={
              '"mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[50px]'
            }
          />
        </div>

        <label className={"ml-[20px] leading-[16px] mb-[5px]"}>
          휴대폰 번호
        </label>
        <div>
          <input
            {...register("phoneNum")}
            type={"text"}
            onChange={(e) => PhoneNumHandler(e, setValue)}
            className={
              '"mt-[5px] mb-[10px] w-[280px] h-[40px] rounded-[50px] border-[#D9D9D9] text-[#4B4B4B] pl-[20px] pr-[50px]'
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
          className={`w-[280px] h-[40px] text-white text-[14px] font-bold bg-black 
          mt-[10px] rounded-[50px] ${!isChecked && "pointer-events-none opacity-50"}`}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
