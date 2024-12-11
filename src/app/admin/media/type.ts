// types/competition.ts
export interface Competition {
  competitionId: number
  userEmail: string
  situation: string
  phase: string
  divisions: string[]
  competitionName: string
  startDate: string
  endDate: string
  content: string
  link: string | null
  files: any[]
  status: string
  createAt: string
  updateAt: string
  deleteAt: string | null
}

export interface CompetitionResponse {
  code: number
  message: string
  data: {
    content: Competition[]
    totalElements: number
    totalPages: number
  }
}

export interface GetCompetitionsParams {
  searchType?: string
  searchKey?: string
  filterStartDate?: string
  filterEndDate?: string
  division?: string
  situation?: string
  page: number
  size: number
}
