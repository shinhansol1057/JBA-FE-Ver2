import { useSession } from "next-auth/react";

export const useIsAdmin = () => {
  const { data: session, status: sessionStatus } = useSession();
  return session?.role === "ROLE_ADMIN" || session?.role === "ROLE_MASTER";
};
