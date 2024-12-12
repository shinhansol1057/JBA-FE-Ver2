// app/admin/gallery/page.tsx
import GalleryTable from './_components/gallery-table'
import SearchBar from './_components/search-bar'
import { getGallery } from './api'
import type { GalleryParams } from './api'

interface SearchParams {
  page?: string
  size?: string
  keyword?: string
  searchCriteriaString?: string
  startDate?: string
  endDate?: string
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = searchParams.size ? parseInt(searchParams.size, 10) : 20
  const params: GalleryParams = {
    page: searchParams.page ? parseInt(searchParams.page, 10) : 0,
    size: pageSize,
    keyword: searchParams.keyword,
    searchCriteriaString: searchParams.searchCriteriaString ?? 'title',
    startDate: searchParams.startDate,
    endDate: searchParams.endDate
  }

  const initialData = await getGallery(params)

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">갤러리 관리</h1>
      <SearchBar />
      <GalleryTable initialData={initialData} pageSize={pageSize} />
    </div>
  )
}

export default Page
