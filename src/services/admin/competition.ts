import { NormalApi } from "../axios/NormalApi"

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

export const getCompetitions = async (params: GetCompetitionsParams) => {
  const queryParams = new URLSearchParams()
  
  if (params.searchType) queryParams.append('searchType', params.searchType)
  if (params.searchKey) queryParams.append('searchKey', params.searchKey)
  if (params.filterStartDate) queryParams.append('filterStartDate', params.filterStartDate)
  if (params.filterEndDate) queryParams.append('filterEndDate', params.filterEndDate)
  if (params.division) queryParams.append('division', params.division)
  if (params.situation) queryParams.append('situation', params.situation)
  queryParams.append('page', params.page.toString())
  queryParams.append('size', params.size.toString())

  const response = await NormalApi.get(`/v1/api/admin/competition?${queryParams.toString()}`)
  return response.data.data
}