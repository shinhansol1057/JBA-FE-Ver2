// types/user.ts

export interface User {
  userId: number
  name: string
  team: string | null
  permission: UserRole
  email: string
  phoneNum: string
  userStatus: "normal" | "deleted" | "locked" | string
  loginAt: string | null
  createAt: string
  updateAt: string | null
  deleteAt: string | null
  lockAt: string | null
  failureCount: number
}

export type UserRole =
  | "user" // 일반 사용자
  | "master" // 마스터
  | "admin" // 관리자
  | "referee" // 심판
  | "referee-leader" // 심판장
  | "table-official" // 테이블 오피셜
  | "table-official-leader" // 테이블 오피셜 리더

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
