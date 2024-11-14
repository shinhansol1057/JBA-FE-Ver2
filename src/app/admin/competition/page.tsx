
import ActionButtons from "@/containers/adminCompetition/ActionButtons"
import CompetitionTable from "@/containers/adminCompetition/CompetitionTable"
import SearchBar from "@/containers/adminCompetition/SearchBar"
import { getCompetitions, GetCompetitionsParams } from "@/services/admin/competition"

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const pageSize = searchParams.size ? parseInt(searchParams.size, 10) : 20
  const params: GetCompetitionsParams = {
    page: searchParams.page ? parseInt(searchParams.page, 10) : 0,
    size: pageSize,
    searchType: searchParams.searchType || 'title',
    searchKey: searchParams.searchKey,
    filterStartDate: searchParams.filterStartDate,
    filterEndDate: searchParams.filterEndDate,
    division: searchParams.division || '전체',
    situation: searchParams.situation || '전체'
  }

  return (
    <div className='p-4 md:p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>대회 관리</h1>
      <SearchBar />
      <ActionButtons/>
      <CompetitionTable searchParams={params} pageSize={pageSize} />
    </div>
  )
}

export default Page