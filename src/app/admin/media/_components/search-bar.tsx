'use client'

import React from 'react'
import { Input, Select, DatePicker, Button, Form } from 'antd'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const { RangePicker } = DatePicker
const { Option } = Select

const SearchBar = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const handleSearch = (values: any) => {
    const params = new URLSearchParams()

    params.append('page', '0')
    params.append('size', '20')

    if (values.keyword) {
      params.append('keyword', values.keyword)
    }
    if (values.searchCriteria !== '제목') {
      params.append('searchCriteriaString', values.searchCriteria)
    }
    if (values.dateRange) {
      params.append('startDate', values.dateRange[0].format('YYYY-MM-DD'))
      params.append('endDate', values.dateRange[1].format('YYYY-MM-DD'))
    }

    router.replace(`/admin/media?${params.toString()}`, { scroll: false })
  }

  const handleReset = () => {
    form.resetFields()
    router.replace('/admin/media', { scroll: false })
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <Form
        form={form}
        onFinish={handleSearch}
        initialValues={{
          keyword: '',
          searchCriteria: '제목',
          dateRange: null
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 space-y-2">
          <Form.Item name="keyword" className="mb-0 w-full">
            <Input placeholder="검색어를 입력하세요" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="searchCriteria" className="mb-0">
            <Select style={{ width: 200 }}>
              <Option value="title">제목</Option>
              <Option value="email">이메일</Option>
              <Option value="id">아이디</Option>
            </Select>
          </Form.Item>

          <Form.Item name="dateRange" className="mb-0 w-full">
            <RangePicker style={{ width: '100%' }} />
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
