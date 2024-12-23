"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchUpdateLinkSocial } from "@/services/user/loginApi";

const SignUpDuplicate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  const linkSocial = async () => {
    if (id && email) {
      const data = await FetchUpdateLinkSocial(id, email).then((res) => {
        if (res.status === 200) {
          confirmAndCancelAlertWithLoading(
            "success",
            "연동 성공",
            "연동되었습니다. 다시 로그인해주세요",
            () => (window.location.href = "/login/social"),
          );
        }
      });
    }
  };

  const openAlert = async () => {
    await confirmAndCancelAlertWithLoading(
      "warning",
      "아이디 중복",
      `${email}로 가입된 계정이 있습니다. 연동하시겠습니까?`,
      async () => linkSocial(),
    ).then((res) => {
      if (res.isDismissed) {
        router.push("/login/social");
      } else {
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    openAlert();
  }, []);
  return <div></div>;
};

export default SignUpDuplicate;
