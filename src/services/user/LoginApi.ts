import process from "process";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { Api } from "@/services/axios/Api";

export const postLogin = async (email: string, password: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/v1/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );
  return await data.json();
};

export const refreshToken = async (
  accessToken: string,
  refreshToken: string,
) => {
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

export const logout = async () => {
  return Api.post("/v1/api/auth/logout", {})
    .then((res) => {
      // console.log("res: ", res);
    })
    .catch((err) => {
      // console.log("err: ", err);
    });
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
  return Api.put(`/v1/api/auth/link-social?socialId=${id}&email=${email}`).then(
    (res) => {
      if (res.status === 200) {
        confirmAndCancelAlertWithLoading(
          "success",
          "연동 성공",
          "연동되었습니다. 다시 로그인해주세요",
          () => (window.location.href = "/login/social"),
        );
      }
    },
  );
};
