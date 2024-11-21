// types/user.ts
export interface User {
  email: string
  isSocial: boolean
  name: string
  phoneNum: string
  role: "마스터" | "일반" | string
  userId: string
  team?: string
  permission: string
  loginAt?: string
  createAt: string
  updateAt?: string
  deleteAt?: string
  lockAt?: string
  failureCount: number
  userStatus: string
  dateOfBirth?: string
  gender?: string
}
export interface UserResponse {
  code: number
  message: string
  data: {
    content: User[]
    totalElements: number
    totalPages: number
  }
}

export interface GetUsersParams {
  page?: number
  size?: number
  keyword?: string
  searchCriteriaString?: string
  permissionsStr?: string
  startDate?: string
  endDate?: string
}
