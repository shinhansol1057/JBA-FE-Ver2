"use client"

import React, { useState } from "react"
import { Input, Select, DatePicker, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const { RangePicker } = DatePicker
const { Option } = Select

const SearchBar = () => {
  const [searchType, setSearchType] = useState<string>("이름")
  const [searchText, setSearchText] = useState("")
  const [permissionsStr, setPermissionsStr] = useState("")
  const [dateRange, setDateRange] = useState<[string, string] | null>(null)
  const [pageSize, setPageSize] = useState(20)
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.append("searchCriteriaString", searchType)
    if (searchText) params.append("keyword", searchText)
    if (permissionsStr) params.append("permissionsStr", permissionsStr)
    if (dateRange) {
      params.append("startDate", dateRange[0])
      params.append("endDate", dateRange[1])
    }
    params.append("size", pageSize.toString())
    params.append("page", "0")
    router.push(`/admin/user?${params.toString()}`)
  }

  const selectStyle = { width: 200, marginBottom: "10px" }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
      <div className='flex flex-col md:flex-row md:items-center md:space-x-4 mb-4'>
        <Select
          defaultValue='이름'
          style={selectStyle}
          onChange={(value: string) => setSearchType(value)}
          popupMatchSelectWidth={100}
        >
          <Option value='name'>이름</Option>
          <Option value='id'>아이디</Option>
        </Select>
        <Input
          placeholder='검색어를 입력하세요'
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
        />
        <Select
          defaultValue=''
          style={selectStyle}
          onChange={(value: string) => setPermissionsStr(value)}
          popupMatchSelectWidth={100}
        >
          <Option value=''>전체</Option>
          <Option value='user'>일반 사용자</Option>
          <Option value='admin'>관리자</Option>
          <Option value='master'>마스터</Option>
        </Select>
        <RangePicker
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(_, dateStrings) =>
            setDateRange(dateStrings as [string, string])
          }
        />
        <Select
          defaultValue={20}
          style={selectStyle}
          onChange={(value: number) => setPageSize(value)}
          popupMatchSelectWidth={150}
        >
          <Option value={20}>20개씩 보기</Option>
          <Option value={50}>50개씩 보기</Option>
          <Option value={100}>100개씩 보기</Option>
        </Select>
      </div>
      <div className='flex justify-end space-x-2'>
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          조회
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
