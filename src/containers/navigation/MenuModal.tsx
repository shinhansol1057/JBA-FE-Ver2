"use client";
import React from "react";
import { menuList, menuListType } from "@/constants/navigation";
import { useRouter } from "next/navigation";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { logout } from "@/services/user/LoginApi";
import { useIsStaff } from "@/hooks/useIsStaff";

type Props = {
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  closeModal: () => void;
};
const MenuModal = ({ setModalOpen, closeModal }: Props) => {
  const router = useRouter();
  const isStaff = useIsStaff();
  const { setCompetitionStatusMenu } = useCompetitionStore();
  const loginButtonHandler = () => {
    setModalOpen(false);
    router.push("/login/social");
  };
  const { data: session, status: sessionStatus } = useSession();

  const logoutHandler = async () => {
    setModalOpen(false);
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_API_KEY + "/login" });
  };

  return (
    <div className={"w-full pl-16 text-base sm:text-xl "}>
      <div className={"flex flex-row justify-end text-[#9B9B9B]"}>
        <IoClose
          onClick={closeModal}
          className={"text-2xl sm:text-3xl md:text-4xl cursor-pointer"}
        />
      </div>
      <div className={"mb-4"}>
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
        <p className={"mb-1 sm:mb-2 md:mb-3"}>JBA 방문을 환영합니다.</p>
        {sessionStatus === "authenticated" ? (
          <div className={"flex justify-between"}>
            <Link
              href={"/user/my-page"}
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-2xl " +
                "w-20 sm:w-24 md:w-28 " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => setModalOpen(false)}
            >
              마이페이지
            </Link>
            <Link href="/admin">
              <button
                className={
                  "flex justify-center items-center font-bold text-white bg-black rounded-[20px] " +
                  "w-[70px] sm:w-[90px] md:w-[110px] " +
                  "h-5 sm:h-6 md:h-7 " +
                  "text-xs sm:text-sm md:text-base "
                }
                onClick={() => setModalOpen(false)}
              >
                관리자
              </button>
            </Link>

            <button
              className={
                "flex justify-center items-center font-bold text-white bg-black rounded-2xl " +
                "w-20 sm:w-24 md:w-28 " +
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
                "flex justify-center items-center font-bold text-white bg-black rounded-2xl " +
                "w-20 sm:w-24 md:w-28 " +
                "h-5 sm:h-6 md:h-7 " +
                "text-xs sm:text-sm md:text-base "
              }
              onClick={() => {
                loginButtonHandler();
              }}
            >
              로그인
            </button>
          </div>
        )}
      </div>
      <div className={"border-t border-[#D9D9D9] border-solid"}>
        {menuList.map((menu: menuListType, menuIndex: number) => {
          return (
            (!menu.isStaffMenu || isStaff) && (
              <div
                className={" flex flex-row pt-2.5 sm:pt-4 md:pt-5"}
                key={menuIndex}
              >
                <div className={"w-24 md:w-28 pl-2.5 mr-2.5"}>
                  <h3 className={"font-bold "}>{menu.title}</h3>
                </div>
                <div
                  className={
                    "flex flex-col text-[#4B4B4B] w-[65%] items-start pl-2.5 " +
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
                          className={"mb-2.5 sm:mb-4 md:mb-5"}
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
            )
          );
        })}
      </div>
    </div>
  );
};

export default MenuModal;
