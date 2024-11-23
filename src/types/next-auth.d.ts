import { DefaultUser } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    email: string;
    sub: string;
    role: string;
    aud: string;
    iat: number;
    exp: number;
  }

  interface Session {
    accessToken: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    refreshToken?;
    string;
  }
}
