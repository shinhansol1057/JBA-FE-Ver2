export const menuList: {
  title: string;
  item: { menu: string; link: string }[];
}[] = [
  {
    title: "농구협회",
    item: [
      { menu: "공지사항", link: "/association/announcement" },
      { menu: "회장인사말", link: "/association/greeting" },
      { menu: "협회역사", link: "/association/history" },
    ],
  },
  {
    title: "제주대회",
    item: [{ menu: "대회정보", link: "/jeju-competition/info" }],
  },
  {
    title: "미디어센터",
    item: [
      { menu: "갤러리", link: "/media/gallery" },
      { menu: "대회영상", link: "/media/video" },
    ],
  },
  {
    title: "커뮤니티",
    item: [
      { menu: "NEWS", link: "/community/news" },
      { menu: "자료실", link: "/community/library" },
      { menu: "FAQ", link: "/community/faq" },
    ],
  },
  // {
  //   title: "심판•경기부",
  //   item: [
  //     { menu: "스텝공지", link: "/" },
  //     { menu: "심판부배정", link: "/" },
  //     { menu: "경기부배정", link: "/" },
  //     { menu: "배정기록", link: "/" },
  //     { menu: "스텝갤러리", link: "/" },
  //   ],
  // },
];
