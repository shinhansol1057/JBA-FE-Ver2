"use client"

import { useRouter } from "next/navigation"
import { Input, Select, DatePicker, Button } from "antd"
import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { GetUsersParams } from "../type"

const { RangePicker } = DatePicker
const { Option } = Select

interface Props {
  defaultValues: GetUsersParams
}

const SearchBar = ({ defaultValues }: Props) => {
  const router = useRouter()

  const handleSearch = (values: any) => {
    const params = new URLSearchParams()
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.append(key, value.toString())
    })
    router.push(`/admin/user?${params.toString()}`)
  }

  const handleReset = () => {
    router.push("/admin/user")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <Select defaultValue={defaultValues.searchCriteriaString || "name"} style={{ width: 200 }}>
          <Option value="name">이름</Option>
          <Option value="email">이메일</Option>
          <Option value="userId">아이디</Option>
          <Option value="team">소속팀</Option>
        </Select>

        <Input
          placeholder="검색어를 입력하세요"
          defaultValue={defaultValues.keyword}
          style={{ width: "100%" }}
        />

        <Select defaultValue={defaultValues.size?.toString() || "20"} style={{ width: 200 }}>
          <Option value="20">20개씩 보기</Option>
          <Option value="50">50개씩 보기</Option>
          <Option value="100">100개씩 보기</Option>
        </Select>

        <RangePicker style={{ width: "100%" }} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button icon={<UndoOutlined />} onClick={handleReset}>
          초기화
        </Button>
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          조회
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
