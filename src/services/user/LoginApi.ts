import process from "process";

export const refreshToken = async (
  accessToken: string,
  refreshToken: string,
) => {
  console.log("refresh start");
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/v1/api/sign/refresh-token-cookie",
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
        `/v1/api/sign/social-login?socialId=${socialId}&email=${email}`,
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
        `/v1/api/sign/social-sign-up?socialId=${socialId}&email=${email}&name=${name}&phoneNum=${phoneNum}`,
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
