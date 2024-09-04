import { signIn } from "next-auth/react";

export const handleSocialSignIn = async (provider: string) => signIn(provider);
