"use client";
import React from "react";
import { menuList } from "@/constants/navigation";
import { redirect, useRouter } from "next/navigation";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type Props = {
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  closeModal: () => void;
};
const MenuModal = ({ setModalOpen, closeModal }: Props) => {
  const router = useRouter();
  const { setCompetitionStatusMenu } = useCompetitionStore();
  const loginButtonHandler = () => {
    setModalOpen(false);
    router.push("/login/social");
  };
  const { data: session, status: sessionStatus } = useSession();

  const logoutHandler = async () => {
    setModalOpen(false);
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_API_KEY + "/login" });
    // router.push("/login");
  };

  return (
    <div className={" w-full pl-[70px] text-base sm:text-xl "}>
      <div className={"flex flex-row justify-end text-[#9B9B9B]"}>
        <IoClose
          onClick={closeModal}
          className={"text-2xl sm:text-3xl md:text-4xl cursor-pointer"}
        />
      </div>
      <div className={"mb-[35px]"}>
        <div className={"flex flex-row"}>
          {sessionStatus === "authenticated" ? (
            <div className={"flex"}>
              <p className={"font-bold"}>{session?.user?.name}</p>
              <p>님</p>
            </div>
          ) : (
            <p>비회원 상태</p>
          )}
        </div>
        <p className={"mb-[5px] sm:mb-[8px] md:mb-[12px]"}>
          JBA 방문을 환영합니다.
        </p>
        {sessionStatus === "authenticated" ? (
          <div className={"flex justify-between"}>
            <Link
              href={"/user/my-page"}
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-[20px] " +
                "w-[70px] sm:w-[90px] md:w-[110px] " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => setModalOpen(false)}
            >
              마이페이지
            </Link>
            <button
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-[20px] " +
                "w-[70px] sm:w-[90px] md:w-[110px] " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => logoutHandler()}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className={"flex justify-between"}>
            <button
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-[20px] " +
                "w-[70px] sm:w-[90px] md:w-[110px] " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => {
                loginButtonHandler();
              }}
            >
              로그인
            </button>
            <button
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-[20px] " +
                "w-[70px] sm:w-[90px] md:w-[110px] " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => router.push("/sign-up")}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
      <div className={"border-t border-[#D9D9D9] border-solid"}>
        {menuList.map(
          (
            menu: { title: string; item: { menu: string; link: string }[] },
            menuIndex: number,
          ) => {
            return (
              <div
                className={" flex flex-row pt-[10px] sm:pt-[15px] md:pt-[20px]"}
                key={menuIndex}
              >
                <div
                  className={
                    "w-[90px] sm:w-[100px] md:w-[120px] pl-[10px] mr-[10px]"
                  }
                >
                  <h3 className={"font-bold "}>{menu.title}</h3>
                </div>
                <div
                  className={
                    "flex flex-col text-[#4B4B4B] w-[65%] items-start pl-[10px] " +
                    (menuList.length === menuIndex + 1
                      ? ""
                      : "border-b border-solid border-[#D9D9D9]")
                  }
                >
                  {menu.item.map(
                    (i: { menu: string; link: string }, itemIndex: number) => {
                      return (
                        <button
                          key={itemIndex}
                          className={"mb-[10px] sm:mb-[15px] md:mb-[20px]"}
                          onClick={() => {
                            setModalOpen(false);
                            router.push(i.link);
                            if (i.menu === "대회정보")
                              setCompetitionStatusMenu("ALL");
                          }}
                        >
                          {i.menu}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default MenuModal;
