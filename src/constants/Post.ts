export const postCategory = ["notice", "library", "news"];

export const postCategoryOption = [
  {
    value: "notice",
    label: "공지사항",
  },
  {
    value: "library",
    label: "자료실",
  },
  {
    value: "news",
    label: "뉴스",
  },
];

export const findPostCategoryUrl = (category: string) => {
  return category === "notice"
    ? "/association/announcement"
    : category === "library"
      ? "/community/library"
      : "/community/news";
};
