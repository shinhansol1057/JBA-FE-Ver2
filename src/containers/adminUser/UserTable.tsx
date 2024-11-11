"use client"

import React from "react"
import { Table, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import UserDetailModal from "./UserDetailModal"

import type { ColumnType } from "antd/es/table"
import { useUserTable } from "@/hooks/useUserTable"
import NoData from "./NoData"

type Props = {
  userData: SearchUserData[]
  pageSize: number
}

const UserTable = ({ userData, pageSize }: Props) => {
  const {
    modalVisible,
    selectedUser,
    handleExcelDownload,
    handleRowClick,
    setModalVisible,
  } = useUserTable(userData, pageSize)

  const columns: ColumnType<SearchUserData>[] = [
    { title: "이름", dataIndex: "name", key: "name" },
    {
      title: "권한",
      dataIndex: "permission",
      key: "permission",
      render: (permission: string) => (
        <span
          className={`px-2 py-1 rounded ${permission === "user" ? "bg-green-500" : "bg-red-500"} text-white`}
        >
          {permission}
        </span>
      ),
    },
    {
      title: "최근로그인",
      dataIndex: "loginAt",
      key: "loginAt",
      render: (loginAt: string) => (loginAt ? loginAt.substring(0, 16) : "-"),
    },
    {
      title: "아이디",
      dataIndex: "userId",
      key: "userId",
      className: "hidden sm:table-cell",
    },
    {
      title: "가입일",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => createAt.substring(0, 10),
      className: "hidden sm:table-cell",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      className: "hidden md:table-cell",
    },
    {
      title: "휴대폰 번호",
      dataIndex: "phoneNum",
      key: "phoneNum",
      className: "hidden lg:table-cell",
    },
    {
      title: "회원상태",
      dataIndex: "userStatus",
      key: "userStatus",
      className: "hidden lg:table-cell",
    },
  ]

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <span>총 {userData?.length ?? 0}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>
      {userData && userData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={userData.map((user) => ({ ...user, key: user.userId }))}
          pagination={{
            pageSize: pageSize,
            position: ["bottomCenter"],
          }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          className='bg-white rounded-lg shadow-md'
        />
      ) : (
        <NoData message='검색 결과가 없습니다.' />
      )}
      <UserDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={selectedUser}
      />
    </>
  )
}

export default UserTable
