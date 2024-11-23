"use client"

import { useRouter } from "next/navigation"
import { Input, Select, DatePicker, Button, Form } from "antd"
import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { GetUsersParams } from "../type"
import dayjs, { Dayjs } from "dayjs"

const { RangePicker } = DatePicker
const { Option } = Select

interface Props {
  defaultValues: GetUsersParams
}

const SearchBar = ({ defaultValues }: Props) => {
  const router = useRouter()
  const [form] = Form.useForm()

  const defaultDateRange =
    defaultValues.startDate && defaultValues.endDate
      ? ([dayjs(defaultValues.startDate), dayjs(defaultValues.endDate)] as [Dayjs, Dayjs])
      : null

  const handleSearch = (values: any) => {
    const params = new URLSearchParams()

    if (values.keyword) params.append("keyword", values.keyword)
    if (values.searchCriteriaString)
      params.append("searchCriteriaString", values.searchCriteriaString)
    if (values.size) params.append("size", values.size)
    if (values.dateRange?.[0] && values.dateRange?.[1]) {
      params.append("startDate", dayjs(values.dateRange[0]).format("YYYY-MM-DD"))
      params.append("endDate", dayjs(values.dateRange[1]).format("YYYY-MM-DD"))
    }

    router.push(`/admin/user${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleReset = () => {
    form.resetFields()
    router.push("/admin/user")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Form
        form={form}
        onFinish={handleSearch}
        initialValues={{
          searchCriteriaString: defaultValues.searchCriteriaString || "name",
          keyword: defaultValues.keyword,
          size: defaultValues.size?.toString() || "20",
          dateRange: defaultDateRange
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <Form.Item name="searchCriteriaString">
            <Select style={{ width: 200 }}>
              <Option value="name">이름</Option>
              <Option value="email">이메일</Option>
              <Option value="id">아이디</Option>
              <Option value="team">소속팀</Option>
            </Select>
          </Form.Item>

          <Form.Item name="keyword">
            <Input placeholder="검색어를 입력하세요" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="size">
            <Select style={{ width: 200 }}>
              <Option value="20">20개씩 보기</Option>
              <Option value="50">50개씩 보기</Option>
              <Option value="100">100개씩 보기</Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateRange">
            <RangePicker style={{ width: "100%" }} defaultValue={defaultDateRange!} />
          </Form.Item>
        </div>

        <div className="flex justify-end space-x-2">
          <Button icon={<UndoOutlined />} onClick={handleReset}>
            초기화
          </Button>
          <Button icon={<SearchOutlined />} htmlType="submit">
            조회
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SearchBar
