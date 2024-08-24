"use client";
import React from "react";
import { menuList } from "@/constants/navigation";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/states/UserStore";
import { JwtDecoder } from "@/utils/JwtDecoder";
import fetchLogout from "@/services/user/LogoutApi";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { IoClose } from "react-icons/io5";

type Props = {
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
const MenuModal = ({ setModalOpen }: Props) => {
  const router = useRouter();
  const { AccessToken, setAccessToken } = useUserStore();
  const { setCompetitionStatusMenu } = useCompetitionStore();
  const loginButtonHandler = () => {
    setModalOpen(false);
    router.push("/login");
  };

  const logoutHandler = () => {
    setModalOpen(false);
    fetchLogout(AccessToken, setAccessToken, router);
  };

  return (
    <div
      className={
        "animate-[rightSlide_0.5s_ease-out] w-[282px] sm:w-[350px] md:w-[500px] pl-[70px] text-[12px] sm:text-[14px] md:text-[16px]"
      }
    >
      <div className={"flex flex-row justify-end text-[#9B9B9B]"}>
        <IoClose
          onClick={() => setModalOpen(false)}
          className={"text-[15px] sm:text-[20px] md:text-[25px] cursor-pointer"}
        />
      </div>
      <div className={"mb-[35px]"}>
        <div
          className={
            "flex flex-row leading-[18px] sm:leading-[22px] md:leading-[28px]"
          }
        >
          {AccessToken ? (
            <div className={"flex"}>
              <p className={"font-bold"}>{JwtDecoder(AccessToken).aud}</p>
              <p>님</p>
            </div>
          ) : (
            <p>비회원 상태</p>
          )}
        </div>
        <p
          className={
            "leading-[18px] sm:leading-[22px] md:leading-[28px] mb-[5px] sm:mb-[8px] md:mb-[12px]"
          }
        >
          JBA 방문을 환영합니다.
        </p>
        {AccessToken ? (
          <div className={"flex justify-between"}>
            <button
              className={
                "w-[60px] sm:w-[80px] md:w-[100px] h-[15px] sm:h-[18px] md:h-[24px] font-bold text-[10px] sm:text-[12px] md:text-[14px] text-white bg-black rounded-[20px]"
              }
            >
              마이페이지
            </button>
            <button
              className={
                "w-[60px] sm:w-[80px] md:w-[100px] h-[15px] sm:h-[18px] md:h-[24px] font-bold text-[10px] sm:text-[12px] md:text-[14px] text-white bg-black rounded-[20px]"
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
                "w-[40px] sm:w-[60px] md:w-[80px] h-[15px] sm:h-[18px] md:h-[24px] font-bold text-[10px] sm:text-[12px] md:text-[14px] text-white bg-black rounded-[20px]"
              }
              onClick={() => {
                loginButtonHandler();
              }}
            >
              로그인
            </button>
            <button
              className={
                "w-[60px] sm:w-[80px] md:w-[100px] h-[15px] sm:h-[18px] md:h-[24px] font-bold text-[10px] sm:text-[12px] md:text-[14px] text-white bg-black rounded-[20px]"
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
                <div className={"w-[80px] sm:w-[90px] md:w-[110px] pl-[10px]"}>
                  <h3 className={"font-bold "}>{menu.title}</h3>
                </div>
                <div
                  className={
                    "flex flex-col text-[#4B4B4B] w-[132px] sm:w-[200px] md:w-[340px] items-start pl-[10px] " +
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
