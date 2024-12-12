'use client'

import { useRouter } from 'next/navigation'
import { Input, Select, DatePicker, Button, Form, Typography } from 'antd'
import { SearchOutlined, UndoOutlined, CalendarOutlined } from '@ant-design/icons'
import { GetUsersParams } from '../type'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker
const { Option } = Select
const { Text } = Typography

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

    if (values.keyword) params.append('keyword', values.keyword)
    if (values.searchCriteriaString)
      params.append('searchCriteriaString', values.searchCriteriaString)
    if (values.size) params.append('size', values.size)
    if (values.dateRange?.[0] && values.dateRange?.[1]) {
      params.append('startDate', dayjs(values.dateRange[0]).format('YYYY-MM-DD'))
      params.append('endDate', dayjs(values.dateRange[1]).format('YYYY-MM-DD'))
    }

    router.push(`/admin/user${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const handleReset = () => {
    form.setFieldsValue({
      searchCriteriaString: 'name',
      keyword: '',
      dateRange: null
    })
    router.push('/admin/user')
    router.refresh()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Form
        form={form}
        onFinish={handleSearch}
        initialValues={{
          searchCriteriaString: defaultValues.searchCriteriaString || 'name',
          keyword: defaultValues.keyword,
          size: defaultValues.size?.toString() || '20',
          dateRange: defaultDateRange
        }}
        layout="vertical"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Form.Item name="searchCriteriaString" className="mb-0 flex-1" label="검색 조건">
                <Select>
                  <Option value="name">이름</Option>
                  <Option value="email">이메일</Option>
                  <Option value="id">아이디</Option>
                  <Option value="team">소속팀</Option>
                </Select>
              </Form.Item>

              <Form.Item name="keyword" className="mb-0 flex-2" label="검색어">
                <Input placeholder="검색어를 입력하세요" />
              </Form.Item>
            </div>

            <Form.Item name="size" label="표시 개수">
              <Select>
                <Option value="20">20개씩 보기</Option>
                <Option value="50">50개씩 보기</Option>
                <Option value="100">100개씩 보기</Option>
              </Select>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="dateRange"
              label={
                <div className="flex items-center space-x-2">
                  <CalendarOutlined />
                  <Text>가입일자 검색</Text>
                  <Text type="secondary" className="text-sm">
                    (시작일 ~ 종료일)
                  </Text>
                </div>
              }
            >
              <RangePicker
                style={{ width: '100%' }}
                defaultValue={defaultDateRange!}
                placeholder={['시작일', '종료일']}
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button icon={<UndoOutlined />} onClick={handleReset} size="large">
            초기화
          </Button>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit" size="large">
            검색
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SearchBar
