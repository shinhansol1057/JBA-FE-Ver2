// import type { NextAuthConfig } from "next-auth"
// import Google from "@auth/core/providers/google"
// import Kakao from "@auth/core/providers/kakao"
// import Credentials from "@auth/core/providers/credentials"
// import { postLogin, socialLogin } from "@/services/user/LoginApi"
// import jwt from "jsonwebtoken"
// import {
//   loginCredentialsService,
//   loginSocialService,
//   refreshTokenService
// } from "@/services/authService"
//
// export default {
//   pages: {
//     signIn: "/login/social"
//   },
//   session: { strategy: "jwt" },
//   providers: [
//     Google,
//     Kakao,
//     Credentials({
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "email@example.com"
//         },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const email = credentials.email as string
//         const password = credentials.password as string
//         const response = await postLogin(email, password)
//         const accessToken = response.data.accessToken
//         const refreshToken = response.data.refreshToken
//         if (response.code === 200) {
//           const userData = jwt.decode(accessToken) as any
//           return {
//             accessToken: accessToken,
//             refreshToken: refreshToken,
//             email,
//             sub: userData.sub,
//             role: userData.role,
//             aud: userData.aud,
//             iat: userData.iat,
//             exp: userData.exp
//           }
//         }
//         return null
//       }
//     })
//   ],
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user
//       const isOnAdmin = nextUrl.pathname.startsWith("/admin")
//       const isOnUser = nextUrl.pathname.startsWith("/user")
//
//       if (isOnAdmin) {
//         const isAdmin = auth?.user?.role === "ROLE_ADMIN" || auth?.user?.role === "ROLE_MASTER"
//         return isAdmin
//       }
//
//       if (isOnUser) {
//         return isLoggedIn
//       }
//
//       return true
//     },
//     async signIn({ user, account, profile }) {
//       if (account && account?.provider !== "credentials") {
//         const data = await socialLogin(account.providerAccountId, user?.email as string)
//         if (data.status === 409) {
//           return `/sign-up/duplicate?id=${account.providerAccountId}&email=${user.email}`
//         }
//       }
//       return true
//     },
//     async jwt({ token, user, trigger, account, profile }) {
//       if (
//         token.accessToken === undefined &&
//         account?.provider !== "credentials" &&
//         account?.providerAccountId
//       ) {
//         token = await loginSocialService(user, account, token, profile)
//       }
//
//       if (account?.provider === "credentials" && user.accessToken && user.email) {
//         token = loginCredentialsService(user, token, user.email)
//       }
//
//       const now = Math.floor(Date.now() / 1000)
//       if ((token.accessTokenExpires as number) > now + 5) {
//         return token
//       }
//
//       try {
//         return refreshTokenService(token)
//       } catch (error) {
//         return {
//           ...token,
//           error: "RefreshAccessTokenError"
//         }
//       }
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken as string
//       session.name = token.name as string
//       session.email = token.id as string
//       session.role = token.role as string
//       return session
//     },
//     async redirect({ url, baseUrl }) {
//       if (url.startsWith("/")) {
//         return `${baseUrl}${url}`
//       } else if (url.includes("duplicate")) {
//         return url
//       }
//       return baseUrl
//     }
//   }
// } satisfies NextAuthConfig
