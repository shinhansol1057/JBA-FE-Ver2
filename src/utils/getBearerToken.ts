import { getSession } from "next-auth/react";
import { auth } from "../../auth";

export const getBearerToken = async () => {
  const session = await getSession();
  if (session?.accessToken) {
    return `Bearer ${session.accessToken}`;
  } else {
    return "";
  }
};

export const getServerBearerToken = async () => {
  const session = await auth();
  if (session?.accessToken) {
    return `Bearer ${session.accessToken}`;
  } else {
    return "";
  }
};
