import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";
import { Api } from "@/services/axios/Api";
import confirmAlert from "@/libs/alert/ConfirmAlert";
import { getSession, signOut } from "next-auth/react";

const useAxiosInterceptor = () => {
  const requestHandler = async (config: InternalAxiosRequestConfig) => {
    // 토큰이 있으면 요청 헤더에 추가한다.
    const session = await getSession();
    config.headers["Authorization"] = session?.accessToken;

    return config;
  };
  const requestErrorHandler = (error: any) => {
    console.log("요청 전 에러!", error);

    return Promise.reject(error);
  };

  const responseHandler = (response: AxiosResponse) => {
    return response;
  };

  const responseErrorHandler = async (error: any) => {
    console.log(error);
    if (error.response.data.detailMessage === "접근 권한 없음") {
      try {
        const res = await confirmAlert("warning", "접근 권한이 없습니다.");
        if (res.isConfirmed) window.location.href = "/";
      } catch (confirmErr) {
        console.error("_error during confirmAlert:", confirmErr);
      }
    } else if (
      error.response.status === 401 &&
      error.response.data.detailMessage !== "자격 증명에 실패하였습니다." &&
      error.response.data.detailMessage !==
        "자격 증명에 실패하였습니다. 계정이 잠깁니다." &&
      error.response.data.detailMessage !== "Login Locked User"
    ) {
      try {
        const res = await confirmAlert("warning", "로그인 해주세요.");
        if (res.isConfirmed) {
          await signOut();
          window.location.href = "/login";
        }
      } catch (confirmErr) {
        console.error("_error during confirmAlert:", confirmErr);
      }
    }
    return Promise.reject(error);
  };

  const requestInterceptor = Api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => requestHandler(config),
    (error: AxiosError | Error) => requestErrorHandler(error),
  );

  const responseInterceptor = Api.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError | Error) => responseErrorHandler(error),
  );

  useEffect(() => {
    return () => {
      Api.interceptors.request.eject(requestInterceptor);
      Api.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export { useAxiosInterceptor, Api };
