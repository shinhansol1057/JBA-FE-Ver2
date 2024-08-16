"use client";

import { FormEvent, useEffect, useState } from "react";
import LoginInputBox from "@/containers/login/LoginInputBox";
import { CheckBox } from "@/components/checkbox/CheckBox";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/states/UserStore";
import { getCookie, setCookie } from "@/utils/Cookie";
import fetchLogin from "@/services/user/LoginApi";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const { AccessToken, setAccessToken } = useUserStore();
  const router = useRouter();

  const loginHandler = (e: FormEvent<HTMLFormElement>) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      setEmailMessage("");
      fetchLogin(
        email,
        password,
        setEmailMessage,
        setAccessToken,
        isChecked,
        setCookie,
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsChecked(!!getCookie("savedEmail"));
      if (AccessToken) {
        window.location.href = "/";
      }
    }
  }, [AccessToken]);

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
        로그인
      </h1>
      <form
        noValidate
        className={"w-[280px] text-[12px] flex flex-col"}
        onSubmit={(e) => loginHandler(e)}
      >
        <label className={"ml-[20px] leading-[16px]"} htmlFor={"email"}>
          이메일
        </label>
        <LoginInputBox type={"email"} id={"email"} setValue={setEmail} />
        <div>
          <p>{emailMessage}</p>
        </div>
        <label className={"ml-[20px] leading-[16px]"} htmlFor={"password"}>
          비밀번호
        </label>
        <LoginInputBox
          type={"password"}
          id={"password"}
          setValue={setPassword}
        />
        <div className={"mt-[40px] mb-[10px] pl-[20px]"}>
          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            content={"이메일 기억하기"}
          />
        </div>
        <button
          className={
            "w-[280px] h-[40px] rounded-[50px] bg-black text-[14px] font-bold text-[white]"
          }
        >
          로그인
        </button>
      </form>
      <button
        onClick={() => router.push("/sign-up")}
        className={
          "w-[280px] h-[40px] rounded-[50px] bg-white text-[14px] font-bold text-black border border-solid border-[#D9D9D9] mt-[10px]"
        }
      >
        회원가입
      </button>
      <button
        className={"text-[12px] text-[#8E8E8E] mt-[10px]"}
        onClick={() => console.log("비번찾기")}
      >
        계정 찾기 | 비밀번호 찾기
      </button>
    </div>
  );
};

export default Login;
