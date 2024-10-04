import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import process from "process";
import jwt from "jsonwebtoken";
import { signOut } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import {
  refreshToken,
  socialLogin,
  socialSignUp,
} from "@/services/user/LoginApi";

export const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // authorize 함수의 credentials 타입을 지정
        username: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const request = {
          email: credentials?.username,
          password: credentials?.password,
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/v1/api/sign/login-cookie`,
          {
            method: "POST",
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        const data = await res.json();
        if (res.ok && data?.data) {
          const userData = jwt.decode(data.data.accessToken);
          if (userData !== null && typeof userData !== "string") {
            return {
              id: String(userData.sub),
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,

              sub: String(userData.sub),
              // @ts-ignore
              role: String(userData.role),
              // @ts-ignore
              aud: userData.aud,
              // @ts-ignore
              iat: Number(userData.iat),
              // @ts-ignore
              exp: Number(userData.exp),
            };
          }
        } else {
          throw new Error(JSON.stringify(data));
        }
        return data;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", user, account, profile, email, credentials);

      if (
        (account?.provider === "google" || account?.provider === "naver") &&
        user?.email &&
        account
      ) {
        const data = await socialLogin(account.providerAccountId, user.email);
        account.access_token = data.accessToken;
        account.refresh_token = data.refreshToken;
        console.log("loginres: ", data);
        if (data.status === 200) {
          return true;
        } else if (data.status === 404) {
          if (account.provider === "google" && user?.name) {
            const data = await socialSignUp(
              account.providerAccountId,
              user.email,
              user.name,
              null,
            );
            account.access_token = data.accessToken;
            account.refresh_token = data.refreshToken;
            console.log("googleres: ", data);
            return true;
          }
          if (account?.provider === "naver" && profile) {
            const data = await socialSignUp(
              account.providerAccountId,
              null,
              // @ts-ignore
              profile.response.name,
              // @ts-ignore
              profile.response.mobile,
            );
            account.access_token = data.accessToken;
            account.refresh_token = data.refreshToken;
            console.log("naverres: ", data);
            return true;
          }
        } else if (data.status === 409) {
          console.log("res: ", data);
          return `/sign-up/duplicate?id=${account.providerAccountId}&email=${user.email}`;
        }
      }
      // @ts-ignore
      if (user.accessToken) {
        return true;
      }
      return false;
    },

    async jwt({ token, user, trigger, account, profile }) {
      console.log("jwt", account);

      if (
        (account?.provider === "google" || account?.provider === "naver") &&
        account.access_token &&
        account.refresh_token
      ) {
        const userData = jwt.decode(account.access_token);
        if (userData !== null && typeof userData !== "string") {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.name = String(userData.aud);
          token.id = String(userData.sub);
          token.accessTokenExpires = Number(userData.exp);
          token.iat = Number(userData.iat);
          token.role = String(userData.role);
          return token;
        } else {
          throw new Error(JSON.stringify(account));
        }
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.aud;
        token.id = user.sub;
        token.accessTokenExpires = user.exp;
        token.iat = user.iat;
        token.role = user.role;
        return token;
      }

      // 토큰 만료 체크
      const now = Math.floor(Date.now() / 1000);
      if (token.accessTokenExpires > now) {
        return token;
      }

      try {
        const data = await refreshToken(token.accessToken, token.refreshToken);
        const newTokens = data?.data;
        token.accessToken = newTokens.accessToken;
        token.refreshToken = newTokens.refreshToken;
        // @ts-ignore
        const decodedToken = jwt.decode(token.accessToken);
        // @ts-ignore
        token.accessTokenExpires = decodedToken.exp;
        // @ts-ignore
        token.iat = decodedToken.iat;
        return token;
      } catch (error) {
        await signOut({ callbackUrl: "/login" });
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.name = token.name;
      session.email = token.id;
      session.role = token.role;
      return session;
    },
  },
  events: {
    async signOut(message) {
      try {
        const data = await refreshToken(
          message.token.accessToken,
          message.token.refreshToken,
        );
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_KEY + "/v1/api/sign/logout-cookie",
          {
            method: "POST",
            headers: {
              Authorization: data.data.AccessToken,
            },
            credentials: "include",
            body: "",
          },
        );
        return res.json();
      } catch (error) {}
    },
  },
  debug: process.env.NODE_ENV === "development",
};
