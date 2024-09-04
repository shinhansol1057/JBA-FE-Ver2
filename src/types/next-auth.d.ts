import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["User"];
    accessToken?: string;
    refreshToken?: string;
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
    // accessTokenExpires: number;
    // refreshToken: string;
    // refreshTokenExpires?: number;
    exp: number;
    iat: number;
    // error?: "RefreshAccessTokenError";
  }
}
