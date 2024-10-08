export interface MockPost {
  postId: number;
  title: string;
  content: string;
  writer: string;
  createAt: string;
}

export interface MockDataType {
  totalPages: number;
  totalPosts: number;
  posts: MockPost[];
}

export const FAQMockData: MockDataType = {
  totalPages: 1,
  totalPosts: 3,
  posts: [
    {
      postId: 134,
      title: "홈페이지를 이용하기 위해 회원가입이 필수인가요?",
      content:
        "일반 방문객분들은 회원가입을 안하셔도 홈페이지 이용에 무리가 없습니다. 현재는 협회 관리자를 위한 기능입니다.",
      writer: "관리자",
      createAt: "2024-06-23",
    },
    {
      postId: 31,
      title: "대회 참가신청은 어떻게 하나요?",
      content:
        "대회 참가신청은 상단 메뉴에서 대회정보를 확인 부탁드리며 보통은 참가신청서를 작성 후 메일로 참가신청을 받고 있습니다. 자세한 사항은 대회정보를 확인해주세요. ",
      writer: "관리자",
      createAt: "2024-02-25",
    },
    {
      postId: 32,
      title: "사진이나 영상을 올리고 싶은데 어떻게하나요?",
      content:
        "홈페이지 모든 게시물은 관리자가 관리하고 있습니다. 관리자에게 문의 부탁드립니다.(하단 협회메일 참고)",
      writer: "이브라히모비치",
      createAt: "2024-02-25",
    },
    // {
    //   postId: 33,
    //   title: "OOO 선수 이번에 참가하나요?",
    //   content: "OOO 선수 이번에 참가하나요?",
    //   writer: "이브라히모비치",
    //   createAt: "2024-02-25",
    // },
    // {
    //   postId: 88,
    //   title: "뉴스공지3",
    //   content: "뉴스공지3",
    //   writer: "이브라히모비치",
    //   createAt: "2024-06-12",
    // },
    // {
    //   postId: 85,
    //   title: "농구협회 심판 등록 관련 문의는 어디에 하면 되나요?",
    //   content: "농구협회 심판 등록 관련 문의는 어디에 하면 되나요?",
    //   writer: "이브라히모비치",
    //   createAt: "2024-06-12",
    // },
    // {
    //   postId: 83,
    //   title: "후원 문의는 어디에 하나여?",
    //   content: "후원 문의는 어디에 하나여?",
    //   writer: "이브라히모비치",
    //   createAt: "2024-06-10",
    // },
    // {
    //   postId: 82,
    //   title: "뉴스공지3",
    //   content: "뉴스공지3",
    //   writer: "이브라히모비치",
    //   createAt: "2024-06-10",
    // },
    // {
    //   postId: 76,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-06-10",
    // },
    // {
    //   postId: 58,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-03-18",
    // },
    // {
    //   postId: 59,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-03-18",
    // },
    // {
    //   postId: 61,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-03-18",
    // },
    // {
    //   postId: 34,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-02-25",
    // },
    // {
    //   postId: 35,
    //   title: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   content: "OOO 경기 티켓은 어디에서 구매할 수 있나요??",
    //   writer: "이브라히모비치",
    //   createAt: "2024-02-25",
    // },
  ],
};
