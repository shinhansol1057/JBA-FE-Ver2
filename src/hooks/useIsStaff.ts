import { useSession } from "next-auth/react";

export const useIsStaff = () => {
  const { data: session, status: sessionStatus } = useSession();
  return (
    session?.role === "ROLE_ADMIN" ||
    session?.role === "ROLE_MASTER" ||
    session?.role === "ROLE_REFEREE" ||
    session?.role === "ROLE_REFEREE_LEADER" ||
    session?.role === "ROLE_TABLE_OFFICIAL" ||
    session?.role === "ROLE_TABLE_OFFICIAL_LEADER"
  );
};
