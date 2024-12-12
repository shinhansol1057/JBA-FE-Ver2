"use server"

import { authApi } from "@/services/axios/AuthApi"
import { PostResponse } from "@/types/Admin"

type ActionType<T> = {
  success: boolean
  message: string
  data?: T
}

export async function fetchInitialPosts(category = "notice"): Promise<PostResponse> {
  const params = new URLSearchParams({
    page: "0",
    size: "20",
    category
  })

  const response = await authApi.get<PostResponse>(`/v1/api/post/${category}`, { params })
  return response.data
}

export async function updateUserRole(userId: number, role: string): Promise<ActionType<void>> {
  try {
    await authApi.put(`/v1/api/admin/user/${userId}/permission?permissionsStr=${role}`)
    return {
      success: true,
      message: "권한이 성공적으로 변경되었습니다"
    }
  } catch (error) {
    console.error("Role update failed:", error)
    return {
      success: false,
      message: "권한 변경에 실패했습니다"
    }
  }
}
