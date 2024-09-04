"use client";

import { FormEvent, useEffect, useState } from "react";
import LoginInputBox from "@/containers/login/LoginInputBox";
import { CheckBox } from "@/components/common/checkbox/CheckBox";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/Cookie";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const router = useRouter();
  const { data } = useSession();
  console.log(data);
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailMessage("");
    const res = await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(res);
    // if (typeof window !== "undefined") {
    //   e.preventDefault();
    //   fetchLogin(
    //     email,
    //     password,
    //     setEmailMessage,
    //     setAccessToken,
    //     isChecked,
    //     setCookie,
    //   );
    // }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getCookie("savedEmail") && setEmail(getCookie("savedEmail"));
    }
  }, []);

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
        <LoginInputBox
          type={"email"}
          id={"email"}
          value={email}
          setValue={setEmail}
        />
        <div>
          <p className={"ml-[20px] mb-[10px] text-[#DF1A1A]"}>{emailMessage}</p>
        </div>
        <label className={"ml-[20px] leading-[16px]"} htmlFor={"password"}>
          비밀번호
        </label>
        <LoginInputBox
          type={"password"}
          id={"password"}
          value={password}
          setValue={setPassword}
        />
        <div className={"mt-[20px] mb-[10px] pl-[20px]"}>
          <CheckBox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            content={"이메일 기억하기"}
          />
        </div>
        <button
          type={"submit"}
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
