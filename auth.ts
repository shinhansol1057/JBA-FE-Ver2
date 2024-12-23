import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Kakao from "@auth/core/providers/kakao";
import Credentials from "@auth/core/providers/credentials";
import { postLogin, refreshToken, socialLogin } from "@/services/user/LoginApi";
import jwt from "jsonwebtoken";
import {
  loginCredentialsService,
  loginSocialService,
  refreshTokenService,
} from "@/services/authService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: true,
  pages: {
    signIn: "/login/social",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 3,
  },
  providers: [
    Google,
    Kakao,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string; // 타입 단언
        const password = credentials.password as string; // 타입 단언
        const response = await postLogin(email, password);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        if (response.code === 200) {
          const userData = jwt.decode(accessToken) as any;
          return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            email,
            sub: userData.sub,
            role: userData.role,
            aud: userData.aud,
            iat: userData.iat,
            exp: userData.exp,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account?.provider !== "credentials") {
        const data = await socialLogin(
          account.providerAccountId,
          user?.email as string,
        );
        if (data.status === 409) {
          return `/sign-up/duplicate?id=${account.providerAccountId}&email=${user.email}`;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, account, profile }) {
      //로그인 시도 시 토큰 발급(소셜로그인)
      if (
        token.accessToken === undefined &&
        account?.provider !== "credentials" &&
        account?.providerAccountId
      ) {
        token = await loginSocialService(user, account, token, profile);
      }

      //로그인 시도 시 토큰 정보를 token 으로 전달(이메일로그인)
      if (
        account?.provider === "credentials" &&
        // @ts-ignore
        user.accessToken &&
        user.email
      ) {
        token = loginCredentialsService(user, token, user.email);
      }

      // 토큰 만료 체크
      const now = Math.floor(Date.now() / 1000);
      if ((token.accessTokenExpires as number) > now + 5) {
        return token;
      }

      // 토큰 만료 시 토큰 재발급
      try {
        return refreshTokenService(token);
      } catch (error) {
        await signOut({ redirectTo: "/login/social" });
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      session.name = token.name as string;
      session.email = token.id as string;
      session.role = token.role as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 커스텀 리디렉션 로직 추가
      if (url.startsWith("/")) {
        // 내부 URL일 경우 기본 URL 붙이기
        return `${baseUrl}${url}`;
      } else if (url.includes("duplicate")) {
        // 409로 인해 반환된 URL 처리
        return url;
      }
      // 기본적으로 홈으로 리디렉션
      return baseUrl;
    },
  },
});
