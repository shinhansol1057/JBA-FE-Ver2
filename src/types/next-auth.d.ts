import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    role: string;
    email: string;
    name: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    email: string;
    sub: string;
    role: string;
    aud: string;
    iat: number;
    exp: number;
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
    role: string;
    accessTokenExpires: number;
    id: string;
  }
}
