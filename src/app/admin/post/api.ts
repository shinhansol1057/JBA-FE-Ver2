// services/admin/post.ts

import { authApi } from "@/services/axios/AuthApi"
import { PostResponse, PostSearchParams } from "./type"

export const getPosts = async (params: PostSearchParams) => {
  try {
    const response = await authApi.get<PostResponse>("/v1/api/post/notice", { params })
    return response.data.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], totalPosts: 0, totalPages: 0 }
  }
}
