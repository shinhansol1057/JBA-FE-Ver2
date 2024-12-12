export type menuListType = {
  title: string;
  item: { menu: string; link: string }[];
  isStaffMenu: boolean; //관리자, 심판,경기부 메뉴인지 확인
};

export const menuList: menuListType[] = [
  {
    title: "농구협회",
    item: [
      { menu: "공지사항", link: "/association/announcement" },
      { menu: "회장인사말", link: "/association/greeting" },
      { menu: "협회역사", link: "/association/history" },
    ],
    isStaffMenu: false,
  },
  {
    title: "제주대회",
    item: [{ menu: "대회정보", link: "/jeju-competition/info" }],
    isStaffMenu: false,
  },
  {
    title: "미디어센터",
    item: [
      { menu: "갤러리", link: "/media/gallery" },
      { menu: "대회영상", link: "/media/video" },
    ],
    isStaffMenu: false,
  },
  {
    title: "커뮤니티",
    item: [
      { menu: "NEWS", link: "/community/news" },
      { menu: "자료실", link: "/community/library" },
      { menu: "FAQ", link: "/community/faq" },
    ],
    isStaffMenu: false,
  },
  {
    title: "심판•경기부",
    item: [
      { menu: "스탭공지", link: "/" },
      { menu: "심판부 배정신청", link: "/" },
      { menu: "경기부 배정신청", link: "/" },
      { menu: "배정기록", link: "/" },
      { menu: "스탭갤러리", link: "/" },
    ],
    isStaffMenu: true,
  },
];
