import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["User"];
    expires: string;
    accessToken?: string;
    accessTokenExpires: string;
    refreshToken?: string;
    refreshTokenExpires?: number;
    error?: "RefreshAccessTokenError";
  }

  interface User extends DefaultUser {
    accessToken: string;
    sub: string;
    role: string;
    aud: string;
    iat: number;
    exp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    accessToken: string;
    // accessTokenExpires: number;
    // refreshToken: string;
    // refreshTokenExpires?: number;
    exp: number;
    iat: number;
    // error?: "RefreshAccessTokenError";
  }
}
