import { getSession } from "next-auth/react";

export const getBearerToken = async () => {
  const session = await getSession();
  return `Bearer ${session?.accessToken}`;
};
