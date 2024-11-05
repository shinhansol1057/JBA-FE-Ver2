"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import SocialLoginBtn from "@/components/login/SocialLoginBtn";

const SocialLogin = () => {
  const googleLogin = async () => {
    const res = await signIn("google", { callbackUrl: "/" });
  };

  // const naverLogin = async () => {
  //   const res = await signIn("naver", { callbackUrl: "/" });
  // };

  const kakaoLogin = async () => {
    const res = await signIn("kakao", { callbackUrl: "/" });
  };

  return (
    <div
      className={
        "flex flex-col items-center w-full h-[100vh] -mt-[30px] sm:-mt-[40px] md:-mt-[50px]"
      }
    >
      <h1
        className={
          "mt-[80px] sm:mt-[90px] md:mt-[100px] mb-[15px] text-2xl font-bold"
        }
      >
        소셜 로그인
      </h1>
      <SocialLoginBtn
        loginFc={googleLogin}
        imgSrc={"/image/social/google.svg"}
        alt={"google"}
        content={"구글 로그인"}
        backgroundColor={"#FFFFFF"}
      />
      {/*<SocialLoginBtn*/}
      {/*  loginFc={naverLogin}*/}
      {/*  imgSrc={"/image/social/naver.png"}*/}
      {/*  alt={"naver"}*/}
      {/*  content={"네이버 로그인"}*/}
      {/*  backgroundColor={"#02C75A"}*/}
      {/*/>*/}
      <SocialLoginBtn
        loginFc={kakaoLogin}
        imgSrc={"/image/social/kakao.svg"}
        alt={"kakao"}
        content={"카카오 로그인"}
        backgroundColor={"#F8DE36"}
      />
      <div className={"w-[90%] md:w-[500px] flex items-center justify-between"}>
        <hr className="w-[43%] md:w-[230px] my-[20px] border-t border-[#B3B3B3]" />
        <p className={"text-[#B3B3B3] text-lg"}>OR</p>
        <hr className="w-[43%] md:w-[230px] my-[20px] border-t border-[#B3B3B3]" />
      </div>
      <Link
        href={"/login"}
        className={
          "w-[90%] md:w-[500px] h-[60px] text-lg rounded-[10px] bg-white font-bold text-black border border-solid border-[#D9D9D9] mt-[10px] flex items-center justify-center"
        }
      >
        이메일 로그인
      </Link>
    </div>
  );
};

export default SocialLogin;
