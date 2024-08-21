export type getPostListItem = {
  postId: number;
  isAnnouncement: boolean;
  title: string;
  writer: string;
  createAt: string;
  viewCount: number;
};

export type getPostList = {
  totalPages: number;
  totalPosts: number;
  posts: getPostListItem[];
};
