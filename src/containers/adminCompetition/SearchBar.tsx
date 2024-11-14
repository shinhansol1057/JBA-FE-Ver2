"use client"

import React, { useState, useEffect } from "react"
import { Input, Select, DatePicker, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { NormalApi } from "@/services/axios/NormalApi"

const { RangePicker } = DatePicker
const { Option } = Select

const SearchBar = () => {
  const router = useRouter()
  const [divisions, setDivisions] = useState<Array<{divisionName: string}>>([])
  
  const [searchKey, setSearchKey] = useState("")
  const [division, setDivision] = useState("전체")
  const [situation, setSituation] = useState("전체")
  const [dateRange, setDateRange] = useState<[string, string] | null>(null)

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await NormalApi.get('/v1/api/division/a-valid')
        setDivisions(response.data.data)
      } catch (error) {
        console.error('부문 목록 조회 실패:', error)
      }
    }
    fetchDivisions()
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.append("searchType", "title")
    if (searchKey) params.append("searchKey", searchKey)
    if (division !== '전체') params.append("division", division)
    if (situation !== '전체') params.append("situation", situation)
    if (dateRange) {
      params.append("filterStartDate", dateRange[0])
      params.append("filterEndDate", dateRange[1])
    }
    params.append("page", "0")
    params.append("size", "20")

    router.push(`/admin/competition?${params.toString()}`)
  }

  const selectStyle = { width: 200, marginBottom: "10px" }

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
      <div className='flex flex-col md:flex-row md:items-center md:space-x-4 mb-4'>
        <Input
          placeholder='대회명을 입력하세요'
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Select
          defaultValue="전체"
          style={selectStyle}
          onChange={(value) => setDivision(value)}
        >
          <Option value="전체">전체 부문</Option>
          {divisions.map((div) => (
            <Option key={div.divisionName} value={div.divisionName}>
              {div.divisionName}
            </Option>
          ))}
        </Select>
        <Select
          defaultValue="전체"
          style={selectStyle}
          onChange={(value) => setSituation(value)}
        >
          <Option value="전체">전체 상태</Option>
          <Option value="예정">예정</Option>
          <Option value="진행중">진행중</Option>
          <Option value="종료">종료</Option>
        </Select>
        <RangePicker
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(_, dateStrings) => setDateRange(dateStrings as [string, string])}
        />
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