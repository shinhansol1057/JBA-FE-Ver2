"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import confirmAndCancelAlertWithLoading from "@/libs/alert/ConfirmAndCancelAlertWithLoading";
import { FetchUpdateLinkSocial } from "@/services/user/LoginApi";

const SignUpDuplicate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  const linkSocial = async () => {
    if (id && email) {
      const data = await FetchUpdateLinkSocial(id, email);
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
