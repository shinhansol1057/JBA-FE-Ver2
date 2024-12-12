import { refreshToken, socialLogin, socialSignUp } from "@/services/user/LoginApi"
import jwt from "jsonwebtoken"
import { JWT } from "@auth/core/jwt"

const loginSocialService = async (user: any, account: any, token: any, profile: any) => {
  const data = await socialLogin(account.providerAccountId, user?.email as string)
  if (data.status === 200) {
    token.email = data.email
    token = decodeAccessTokenAndAppendToken(data.accessToken, data.refreshToken, token)
  }

  // 로그인 시도 중 사용자 정보가 없는 경우 회원가입 진행(소셜 로그인)
  if (data.status === 404) {
    if (account.provider === "google" && user?.name && user?.email) {
      const signupData = await socialSignUp(account.providerAccountId, user.email, user.name, null)
      token.email = signupData.email
      token = decodeAccessTokenAndAppendToken(
        signupData.accessToken,
        signupData.refreshToken,
        token
      )
    }
    if (account.provider === "kakao" && profile) {
      const data = await socialSignUp(
        profile.id,
        profile.kakao_account.email,
        profile.kakao_account?.name,
        "0" + profile.kakao_account.phone_number.substring(4)
      )
      token.email = data.email
      token = decodeAccessTokenAndAppendToken(data.accessToken, data.refreshToken, token)
    }
    //TODO: redirection 로직 따로 빼기
    // else if (data.status === 409) {
    //   console.log("res: ", data);
    //   return `/sign-up/duplicate?id=${account.providerAccountId}&email=${user.email}`;
    // }
  }
  return token
}

const loginCredentialsService = (user: any, token: JWT, email: string) => {
  const userData = jwt.decode(user.accessToken)
  if (userData !== null && typeof userData !== "string") {
    token.accessToken = user.accessToken
    token.refreshToken = user.refreshToken
    token.email = email
    token.name = String(userData.aud)
    token.id = String(userData.sub)
    token.accessTokenExpires = Number(userData.exp)
    token.iat = Number(userData.iat)
    token.role = String(userData.role)
  }
  return token
}

const refreshTokenService = async (token: JWT) => {
  if (token.refreshToken === undefined || token.accessToken === undefined) {
    throw new Error("token is undefined")
  }
  const data = await refreshToken(token.accessToken as string, token.refreshToken as string)
  const newTokens = data?.data
  token.accessToken = newTokens.accessToken
  token.refreshToken = newTokens.refreshToken
  const decodedToken = jwt.decode(newTokens.accessToken)
  if (decodedToken !== null && typeof decodedToken !== "string") {
    token.accessTokenExpires = decodedToken.exp
    token.iat = decodedToken.iat
  }
  return token
}

const decodeAccessTokenAndAppendToken = (accessToken: string, refreshToken: string, token: JWT) => {
  const userData = jwt.decode(accessToken)
  if (userData !== null && typeof userData !== "string") {
    token.accessToken = accessToken
    token.refreshToken = refreshToken
    token.name = String(userData.aud)
    token.id = String(userData.sub)
    token.accessTokenExpires = Number(userData.exp)
    token.iat = Number(userData.iat)
    token.role = String(userData.role)
  }
  return token
}

export { loginSocialService, loginCredentialsService, refreshTokenService }
