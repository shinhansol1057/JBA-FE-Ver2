// app/admin/post/page.tsx

import PostTable from "./_components/post-table"
import SearchBar from "./_components/search-bar"
import { getPosts } from "./api"

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const params = {
    page: searchParams.page ? parseInt(searchParams.page, 10) : 0,
    size: searchParams.size ? parseInt(searchParams.size, 10) : 20,
    searchType: searchParams.searchType || "title",
    searchKeyword: searchParams.searchKeyword,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate
  }

  const initialData = await getPosts(params)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">게시물 관리</h1>
      <SearchBar />
      <PostTable initialData={initialData} />
    </div>
  )
}
