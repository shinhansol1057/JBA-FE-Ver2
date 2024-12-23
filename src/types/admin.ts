export interface User {
  email: string;
  isSocial: boolean; 
  name: string;
  phoneNum: string;
  role: "마스터" | "일반" | string;
}

export interface Post {
  postId: number
  isAnnouncement: boolean
  title: string
  writer: string
  createAt: string
  viewCount: number
  status: string
  category: string
  updateAt: string
  deleteAt: string | null
}

export interface PostResponse {
  code: number
  message: string
  data: {
    totalPages: number
    totalPosts: number
    posts: Post[]
  }
}