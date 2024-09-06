import { NormalApi } from "@/services/axios/NormalApi";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const fetchLogout = (
  AccessToken: string | null,
  setAccessToken: (token: string | null) => void,
  router: AppRouterInstance,
): void => {
  NormalApi.post(
    "/v1/api/sign/logout-cookie",
    {},
    {
      headers: {
        Authorization: AccessToken,
      },
    },
  )
    .then((res) => {
      setAccessToken(null);
      router.push("/login");
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400 || err.response.status === 401) {
        setAccessToken(null);
        router.push("/login");
      }
    });
};

export default fetchLogout;
