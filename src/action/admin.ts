'use server'

import { authApi } from "@/services/axios/AuthApi"
import { PostResponse } from "@/types/Admin"

export async function fetchInitialPosts(category = 'notice'): Promise<PostResponse> {
  const params = new URLSearchParams({
    page: '0',
    size: '20',
    category,
  })

  const response = await authApi.get<PostResponse>(`/v1/api/post/${category}`, { params })
  return response.data
}