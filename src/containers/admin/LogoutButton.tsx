"use client"

import { signOut } from "next-auth/react"

export const LogoutButton = () => {
  const onLogout = async () => {
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_API_KEY + "/login" })
  }

  return <button onClick={onLogout}>로그아웃</button>
}
