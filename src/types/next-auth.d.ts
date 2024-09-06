import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // user: User & DefaultSession["User"];
    accessToken?: string;
    name?: string;
    role?: string;
    email?: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    sub: string;
    role: string;
    aud: string;
    iat: number;
    exp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    accessTokenExpires: number;
    iat: number;
    // error?: "RefreshAccessTokenError";
  }
}
