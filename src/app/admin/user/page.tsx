import UserTable from "./_components/user-table"
import SearchBar from "./_components/searchbar"
import { getUsers } from "./api"

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const pageSize = searchParams.size ? parseInt(searchParams.size, 10) : 20
  const params = {
    page: searchParams.page ? parseInt(searchParams.page, 10) : 0,
    size: pageSize,
    keyword: searchParams.keyword,
    searchCriteriaString: searchParams.searchCriteriaString || "name",
    permissionsStr: searchParams.permissionsStr,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate
  }

  const initialData = await getUsers(params)
  console.log(initialData)
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">회원 관리</h1>
      <SearchBar defaultValues={params} />
      <UserTable initialData={initialData} pageSize={pageSize} />
    </div>
  )
}

export default Page
