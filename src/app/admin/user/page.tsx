"use client"

import React, { useState, useEffect } from "react"
import { Table, Input, Select, DatePicker, Button, Modal } from "antd"
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { RangePicker } = DatePicker
const { Option } = Select

interface MemberData {
  key: string
  id: string
  name: string
  type: string
  status: string
  email: string
  phone: string
  birthDate: string
  gender: string
  membershipStatus: string
  lastLogin: string
  registrationDate: string
  loginsCount: number
}

const Page = () => {
  const [data, setData] = useState<MemberData[]>([
    {
      key: "1",
      id: "thames.kang",
      name: "강태임",
      type: "개인",
      status: "유지",
      email: "thames@gripcorp.co",
      phone: "01055552222",
      birthDate: "771122",
      gender: "남성",
      membershipStatus: "정상",
      lastLogin: "2023-04-10 18:52:24",
      registrationDate: "2023-04-10 18:52:24",
      loginsCount: 5,
    },
    {
      key: "2",
      id: "solsolisol",
      name: "신동희",
      type: "제휴사",
      status: "심판",
      email: "donghee.shin@gripcorp.co",
      phone: "01077778888",
      birthDate: "890315",
      gender: "여성",
      membershipStatus: "탈퇴",
      lastLogin: "2023-05-15 10:30:12",
      registrationDate: "2022-11-20 09:15:30",
      loginsCount: 27,
    },
  ])
  const [searchType, setSearchType] = useState<"name" | "id">("name")
  const [searchText, setSearchText] = useState<string>("")
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null)
  const [pageSize, setPageSize] = useState<number>(20)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null)
  const [screenSize, setScreenSize] = useState<
    "2xl" | "xl" | "lg" | "md" | "sm"
  >("2xl")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1536) setScreenSize("2xl")
      else if (width >= 1280) setScreenSize("xl")
      else if (width >= 1024) setScreenSize("lg")
      else if (width >= 768) setScreenSize("md")
      else setScreenSize("sm")
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getVisibleColumns = (): ColumnsType<MemberData> => {
    const allColumns: ColumnsType<MemberData> = [
      { title: "아이디", dataIndex: "id", key: "id" },
      { title: "이름", dataIndex: "name", key: "name" },
      { title: "소속팀", dataIndex: "type", key: "type" },
      {
        title: "권한",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <span
            className={`px-2 py-1 rounded ${status === "유지" ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {status}
          </span>
        ),
      },
      { title: "이메일", dataIndex: "email", key: "email" },
      { title: "휴대폰 번호", dataIndex: "phone", key: "phone" },
      { title: "생년월일", dataIndex: "birthDate", key: "birthDate" },
      { title: "성별", dataIndex: "gender", key: "gender" },
      {
        title: "회원상태",
        dataIndex: "membershipStatus",
        key: "membershipStatus",
      },
      { title: "최근로그인시간", dataIndex: "lastLogin", key: "lastLogin" },
      {
        title: "가입일시",
        dataIndex: "registrationDate",
        key: "registrationDate",
      },
      { title: "로그인실패수", dataIndex: "loginsCount", key: "loginsCount" },
    ]

    switch (screenSize) {
      case "2xl":
        return allColumns
      case "xl":
        return allColumns.slice(0, 10)
      case "lg":
        return allColumns.slice(0, 8)
      case "md":
        return allColumns.slice(0, 6)
      case "sm":
        return allColumns.slice(0, 4)
      default:
        return allColumns.slice(0, 4)
    }
  }

  const handleSearch = () => {
    // 검색 로직 구현
  }

  const handleExcelDownload = () => {
    // 엑셀 다운로드 로직 구현
  }

  const handleRowClick = (record: MemberData) => {
    if (screenSize === "sm") {
      setSelectedMember(record)
      setModalVisible(true)
    }
  }

  return (
    <div className='p-4 md:p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>회원 관리</h1>
      <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
        <div className='flex flex-col md:flex-row md:items-center md:space-x-4 mb-4'>
          <Select
            defaultValue='name'
            style={{ width: 120, marginBottom: "10px" }}
            onChange={(value: "name" | "id") => setSearchType(value)}
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
          <RangePicker
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={(dates) =>
              setDateRange(dates as [moment.Moment, moment.Moment] | null)
            }
          />
        </div>
        <div className='flex justify-end space-x-2'>
          <Button icon={<SearchOutlined />} onClick={handleSearch}>
            조회
          </Button>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
        <div className='flex items-center space-x-2 mb-2 md:mb-0'>
          <span>총 건수</span>
          <Input
            style={{ width: 60 }}
            value={pageSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPageSize(Number(e.target.value))
            }
          />
          <span>개씩 보기</span>
        </div>
        <Button
          type='primary'
          icon={<DownloadOutlined />}
          onClick={handleExcelDownload}
        >
          엑셀 다운로드
        </Button>
      </div>
      <Table
        columns={getVisibleColumns()}
        dataSource={data}
        pagination={{ position: ["bottomCenter"], pageSize: pageSize }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        className='bg-white rounded-lg shadow-md'
      />
      <Modal
        title='회원 상세 정보'
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedMember && (
          <div>
            {getVisibleColumns().map((column) => (
              <p key={column.key}>
                <strong>{column.title as React.ReactNode}:</strong>{" "}
                {
                  //@ts-ignore
                  selectedMember[column.dataIndex]
                }
              </p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Page
