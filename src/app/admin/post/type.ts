// types/post.ts
export interface Post {
  postId: number
  isAnnouncement: boolean
  title: string
  writer: string
  createAt: string
  viewCount: number
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

export interface PostSearchParams {
  page?: number
  size?: number
  searchType?: string
  searchKeyword?: string
  startDate?: string
  endDate?: string
}
