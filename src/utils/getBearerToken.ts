import { getSession } from "next-auth/react";

export const getBearerToken = async () => {
  const session = await getSession();
  if (session?.accessToken) {
    return `Bearer ${session.accessToken}`;
  } else {
    return null;
  }
};
