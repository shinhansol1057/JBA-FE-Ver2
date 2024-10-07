"use client"

import { useState } from "react"
import { Table, Input, Select, DatePicker, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"

const { RangePicker } = DatePicker
const { Option } = Select

const Page = () => {
  const data = [
    {
      key: "1",
      id: "thames.kang",
      name: "팀장",
      type: "개인",
      status: "유지",
      email: "thames@gripcorp.co",
      phone: "01055552222",
      birthDate: "771122",
      gender: "남성",
      membershipStatus: "정상",
      lastLogin: "2023-04-10 18:52:24",
      registrationDate: "2023-04-10 18:52:24",
      loginsCount: 0,
    },
    {
      key: "2",
      id: "solsolisol",
      name: "신동희",
      type: "제휴사",
      status: "심판",
      email: "seller@gripcorp.co",
      phone: "01055552222",
      birthDate: "771122",
      gender: "여성",
      membershipStatus: "탈퇴",
      lastLogin: "2023-04-10 18:52:24",
      registrationDate: "2023-04-10 18:52:24",
      loginsCount: 2,
    },
  ]

  const columns = [
    {
      title: "아이디",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "소속팀",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "권한",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${status === "유지" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "휴대폰 번호",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "생년월일",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "회원상태",
      dataIndex: "membershipStatus",
      key: "membershipStatus",
    },
    {
      title: "최근로그인시간",
      dataIndex: "lastLogin",
      key: "lastLogin",
    },
    {
      title: "가입일시",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "로그인실패수",
      dataIndex: "loginsCount",
      key: "loginsCount",
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>회원 관리</h1>
      <div className='bg-yellow-100 p-4 rounded-lg mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <Select defaultValue='이름' style={{ width: 120 }}>
            <Option value='name'>이름</Option>
            <Option value='id'>아이디</Option>
          </Select>
          <Input placeholder='검색어를 입력하세요' style={{ width: 200 }} />
          <RangePicker style={{ width: 300 }} />
        </div>
        <div className='flex justify-end space-x-2'>
          <Button icon={<SearchOutlined />}>조회</Button>
          <Button>검색</Button>
        </div>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center space-x-2'>
          <span>총 건수</span>
          <Input style={{ width: 60 }} defaultValue='20' />
          <Button>개씩 보기</Button>
        </div>
        <Button type='primary'>엑셀 다운로드</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
    </div>
  )
}

export default Page
