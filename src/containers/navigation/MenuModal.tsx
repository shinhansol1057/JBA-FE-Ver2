"use client";
import React from "react";
import { menuList, menuListType } from "@/constants";
import { useRouter } from "next/navigation";
import { useCompetitionStore } from "@/states/CompetitionStore";
import { IoClose } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { useIsStaff } from "@/hooks/useIsStaff";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import LinkBtn from "@/components/common/LinkBtn";

type Props = {
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  closeModal: () => void;
};
const MenuModal = ({ setModalOpen, closeModal }: Props) => {
  const router = useRouter();
  const isStaff = useIsStaff();
  const isAdmin = useIsAdmin();
  const { setCompetitionStatusMenu } = useCompetitionStore();
  const { data: session, status: sessionStatus } = useSession();

  const logoutHandler = async () => {
    setModalOpen(false);
    await signOut();
  };

  return (
    <div className={"w-full pl-12 text-base sm:text-xl "}>
      <div className={"flex flex-row justify-end text-gray-500"}>
        <IoClose
          onClick={closeModal}
          className={"text-2xl sm:text-3xl md:text-4xl cursor-pointer"}
        />
      </div>
      <div className={"mb-2 md:mb-4"}>
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
        <p className={"my-1 md:my-2"}>JBA 방문을 환영합니다.</p>
        {sessionStatus === "authenticated" ? (
          <div className={"flex justify-between"}>
            <LinkBtn
              content="마이페이지"
              linkUrl="/user/my-page"
              fc={() => setModalOpen(false)}
            />
            {isAdmin && (
              <LinkBtn
                content="관리자"
                linkUrl="/admin"
                fc={() => setModalOpen(false)}
              />
            )}
            <LinkBtn content="로그아웃" linkUrl="" fc={() => logoutHandler()} />
          </div>
        ) : (
          <div className={"flex justify-between"}>
            <LinkBtn
              content="로그인"
              linkUrl="/login/social"
              fc={() => setModalOpen(false)}
            />
          </div>
        )}
      </div>
      <div className={"border-t border-borderColor border-solid"}>
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
