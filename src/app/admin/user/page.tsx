import SearchBar from "@/containers/adminUser/SearchBar"
import UserTable from "@/containers/adminUser/UserTable"
import { getUsers, GetUsersParams } from "@/services/admin/user"

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const pageSize = searchParams.size ? parseInt(searchParams.size, 10) : 20
  const params: GetUsersParams = {
    page: searchParams.page ? parseInt(searchParams.page, 10) : 0,
    size: pageSize,
    keyword: searchParams.keyword,
    searchCriteriaString: searchParams.searchCriteriaString || undefined,
    permissionsStr: searchParams.permissionsStr || undefined,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  }

  const users = await getUsers(params)

  return (
    <div className='p-4 md:p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>회원 관리</h1>
      <SearchBar />
      <UserTable userData={users} pageSize={pageSize} />
    </div>
  )
}

export default Page
