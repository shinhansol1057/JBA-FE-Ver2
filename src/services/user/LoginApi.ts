import process from "process";
import { NormalApi } from "@/services/axios/NormalApi";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { signIn } from "next-auth/react";

export const refreshToken = async (
  accessToken: string,
  refreshToken: string,
) => {
  console.log("refresh start");
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/v1/api/auth/refresh-token",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          RefreshToken: refreshToken,
        },
        credentials: "include",
        body: "",
      },
    );
    return await res.json();
  } catch (error) {
    throw new Error("Token Refresh Error");
  }
};

export const socialLogin = async (socialId: String, email: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY +
        `/v1/api/auth/social-login?socialId=${socialId}&email=${email}`,
      {
        method: "POST",
        credentials: "include",
        body: "",
      },
    );
    return await res.json();
  } catch (error) {
    throw new Error("Token Refresh Error");
  }
};

export const socialSignUp = async (
  socialId: String,
  email: string | null,
  name: string,
  phoneNum: string | null,
) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY +
        `/v1/api/auth/social-sign-up?socialId=${socialId}&email=${email}&name=${name}&phoneNum=${phoneNum}`,
      {
        method: "POST",
        credentials: "include",
        body: "",
      },
    );
    return await res.json();
  } catch (error) {
    throw new Error("Token Refresh Error");
  }
};

export const FetchUpdateLinkSocial = async (id: string, email: string) => {
  return NormalApi.post(
    `/v1/api/auth/link-social?socialId=${id}&email=${email}`,
  ).then((res) => {
    if (res.status === 200) {
      confirmAndCancelAlertWithLoading(
        "success",
        "연동 성공",
        "연동되었습니다. 다시 로그인해주세요",
        async () => {
          const res = await signIn("google", { callbackUrl: "/" });
        },
      );
    }
  });
};
