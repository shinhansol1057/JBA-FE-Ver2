import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NormalApi } from "@/services/axios/NormalApi";
import process from "process";
import jwt from "jsonwebtoken";

export const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // authorize 함수의 credentials 타입을 지정
        username: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await NormalApi.post("/v1/api/sign/login-cookie", {
            email: credentials?.username,
            password: credentials?.password,
          });
          if (res && res?.data) {
            const userData = jwt.decode(res.data.data.accessToken);
            // console.log(res.data.data);
            return {
              accessToken: res.data.data.accessToken,
              refreshToken: res.data.data.refreshToken,
              sub: userData?.sub,
              // @ts-ignore
              role: userData?.role,
              // @ts-ignore
              aud: userData?.aud,
              // @ts-ignore
              iat: userData?.iat,
              // @ts-ignore
              exp: userData?.exp,
            };
          } else {
            null;
          }
        } catch (error) {
          console.log("error: " + error);
          if (axios.isAxiosError(error)) {
            return error?.response?.data;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, account, profile }) {
      console.log("Initial Token");
      console.log(token);
      if (user) {
        // 처음 로그인할 때 AccessToken을 저장
        // console.log(user);
        // console.log(new Date(user.exp * 1000).toLocaleString());
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.aud;
        token.id = user.sub;
        token.exp = user.exp;
        token.iat = user.iat;

        return token;
      } else {
        // 토큰 만료 체크
        // const now = Math.floor(Date.now() / 1000);
        // const shouldRefreshTime = token.exp - now;
        // console.log("잔여시간: " + shouldRefreshTime);

        // if (token.exp && token.exp > now) {
        //   // console.log("토큰 만료시간 남음");
        //   console.log(token);
        //   return token;
        // }

        try {
          console.log("refresh 시작");
          const res = await axios.post(
            // process.env.NEXT_PUBLIC_API_KEY + "/v1/api/sign/refresh-token-cookie",
            "http://localhost:8080" + "/v1/api/sign/refresh-token-cookie",
            null,
            {
              // const res = await axios.post(
              //   "http://localhost:8080/v1/api/sign/refresh-token-cookie",
              //   null,
              //   {
              headers: {
                Authorization: token.accessToken,
                RefreshToken: token.refreshToken,
              },
              withCredentials: true,
            },
          );
          const newTokens = res.data.data;
          token.accessToken = newTokens.accessToken;
          token.refreshToken = newTokens.refreshToken;
          const decodedToken = jwt.decode(token.accessToken);
          // console.log(decodedToken);
          // @ts-ignore
          token.exp = decodedToken.exp;
          // @ts-ignore
          token.iat = decodedToken.iat;

          return token;
        } catch (error) {
          return {
            ...token,
            error: error,
          };
        }
      }
    },
    async session({ session, token, user }) {
      // 세션에 AccessToken을 추가;
      console.log(token);
      session.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.email = token.id;
      return session;
    },
  },
  events: {
    // async signOut(message) {
    //   console.log(message);
    //   try {
    //     await NormalApi.post("/v1/api/sign/logout-cookie", {
    //       headers: {
    //         Authorization: user.data,
    //       },
    //       withCredentials: true,
    //     });
    //   } catch (error) {
    //     console.error("Sign out", error);
    //   }
    // },
  },
  debug: process.env.NODE_ENV === "development",
};
