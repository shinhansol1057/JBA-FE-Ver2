"use client"

import { useRouter } from "next/navigation"
import { Select, Input, DatePicker, Button, Form } from "antd"
import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import dayjs from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

const SearchBar = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const handleSearch = (values: any) => {
    const params = new URLSearchParams({
      page: "0",
      size: "20"
    })

    if (values.searchType) params.append("searchType", values.searchType)
    if (values.keyword) params.append("keyword", values.keyword)
    if (values.dateRange) {
      params.append("startDate", values.dateRange[0].format("YYYY-MM-DD"))
      params.append("endDate", values.dateRange[1].format("YYYY-MM-DD"))
    }

    router.push(`/admin/post?${params.toString()}`)
  }

  const handleReset = () => {
    form.resetFields()
    router.push("/admin/post")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <Form
        form={form}
        onFinish={handleSearch}
        initialValues={{
          searchType: "title",
          keyword: "",
          dateRange: [dayjs().subtract(30, "days"), dayjs()]
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-2">
          <Form.Item name="searchType" className="mb-0">
            <Select style={{ width: 200 }}>
              <Option value="title">제목</Option>
              <Option value="userEmail">유저이메일</Option>
              <Option value="postId">게시물아이디</Option>
            </Select>
          </Form.Item>

          <Form.Item name="keyword" className="mb-0 w-full">
            <Input placeholder="검색어를 입력하세요" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="dateRange" className="mb-0 w-full">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="flex justify-end space-x-2">
          <Button icon={<UndoOutlined />} onClick={handleReset}>
            초기화
          </Button>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            검색
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SearchBar
