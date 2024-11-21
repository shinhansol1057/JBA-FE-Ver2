// app/admin/post/_components/search-bar.tsx
"use client"

import { useRouter } from "next/navigation"
import { Select, Input, DatePicker, Button } from "antd"
import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import dayjs from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

const SearchBar = () => {
  const router = useRouter()

  const handleSearch = (values: any) => {
    const params = new URLSearchParams({
      page: "0",
      size: "20",
      ...values
    })
    router.push(`/admin/post?${params.toString()}`)
  }

  const handleReset = () => {
    router.push("/admin/post")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <Select defaultValue="title" style={{ width: 200 }}>
          <Option value="title">제목</Option>
          <Option value="userEmail">유저이메일</Option>
          <Option value="postId">게시물아이디</Option>
        </Select>

        <Input placeholder="검색어를 입력하세요" style={{ width: "100%" }} />

        <RangePicker
          defaultValue={[dayjs().subtract(30, "days"), dayjs()]}
          style={{ width: "100%" }}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button icon={<UndoOutlined />} onClick={handleReset}>
          초기화
        </Button>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
