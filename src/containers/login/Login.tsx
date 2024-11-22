"use client";

import { FormEvent, useEffect, useState } from "react";
import LoginInputBox from "@/containers/login/LoginInputBox";
import { CheckBox } from "@/components/common/checkbox/CheckBox";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "@/utils/Cookie";
import { signIn } from "next-auth/react";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import AutoCloseTimerAlert from "@/libs/alert/AutoCloseTimerAlert";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const router = useRouter();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailMessage("");
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (res?.status === 200) {
      if (isChecked) {
        setCookie("savedEmail", email, 10);
      } else {
        setCookie("savedEmail", "", -1);
      }
      window.location.href = "/";
    }
    if (res?.error) {
      const data = JSON.parse(res.error);
      // 이메일 유효성 검사
      if (data.code === 400 && data.request === "email")
        setEmailMessage(data.detailMessage);
      else if (data.detailMessage === "Not Found User")
        setEmailMessage("이메일을 확인해주세요.");
      else if (data.detailMessage === "Bad credentials")
        confirmAlert(
          "warning",
          `비밀번호를 ${data.request.failureCount}회 틀렸습니다.<br>(5회 실패시 계정 잠금)`,
        );
      else if (data.detailMessage === "Bad credentials 계정이 잠깁니다.")
        confirmAlert(
          "warning",
          "비밀번호를 5회 실패로 계정이 잠깁니다.",
          "5분 뒤에 다시 시도해주세요.",
        );
      else if (data.detailMessage === "Login Locked User")
        AutoCloseTimerAlert(
          "warning",
          "잠긴 계정입니다.",
          "뒤에 다시 로그인해주세요.",
          5 * 60 * 1000 -
            (new Date().getTime() -
              new Date(data.request.failureDate).getTime()),
        );
      else if (data.code === 406)
        confirmAlert(
          "warning",
          "로그인 할 수 없습니다.<br>관리자에게 문의하세요.",
        );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (getCookie("savedEmail")) {
        setIsChecked(true);
        setEmail(getCookie("savedEmail"));
      }
    }
  }, []);

  return (
    <div
      className={
        "flex flex-col items-center w-full h-full -mt-8 sm:-mt-10 md:-mt-12 bg-[#F5F5F5]"
      }
    >
      <h1 className={"mt-20 mb-4 text-2xl font-bold"}>로그인</h1>
      <form
        noValidate
        className={"w-[90%] md:w-[400px] flex flex-col text-[#4B4B4B]"}
        onSubmit={loginHandler}
      >
        <label className={"ml-5"} htmlFor={"email"}>
          이메일
        </label>
        <LoginInputBox
          type={"email"}
          id={"email"}
          value={email}
          setValue={setEmail}
        />
        <div>
          <p className={"ml-5 mb-2.5 text-[#DF1A1A]"}>{emailMessage}</p>
        </div>
        <label className={"ml-5"} htmlFor={"password"}>
          비밀번호
        </label>
        <LoginInputBox
          type={"password"}
          id={"password"}
          value={password}
          setValue={setPassword}
        />
        <div className={"mt-5 mb-2.5 pl-5 flex justify-between"}>
          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            content={"이메일 기억하기"}
          />
          <Link href={"/login/social"}>소셜 로그인 하기 &gt;</Link>
        </div>
        <button
          type={"submit"}
          className={
            "w-full h-12 rounded-2xl bg-black text-xl font-bold text-white mt-2.5"
          }
        >
          로그인
        </button>
      </form>
      <button
        onClick={() => router.push("/sign-up")}
        className={
          "w-[90%] md:w-[400px] h-12 rounded-2xl bg-white text-xl font-bold text-black border border-solid border-[#D9D9D9] mt-5"
        }
      >
        회원가입
      </button>
      <button
        className={"text-base text-[#8E8E8E] mt-5"}
        onClick={() => console.log("비번찾기")}
      >
        계정 찾기 | 비밀번호 찾기
      </button>
    </div>
  );
};

export default Login;
