"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { useAxiosInterceptor } from "@/services/axios/UseAxiosInterceptor";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  useAxiosInterceptor();
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
