import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import process from "process";
import jwt from "jsonwebtoken";
import { signOut } from "next-auth/react";

export const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  providers: [
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
      // @ts-ignore
      if (!user.accessToken && user?.code !== 200) {
        return false;
      }
      return true;
    },

    async jwt({ token, user, trigger, account, profile }) {
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
        alert("로그인이 만료되었습니다.");
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

const refreshToken = async (accessToken: string, refreshToken: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_KEY + "/v1/api/sign/refresh-token-cookie",
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
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
