"use client"

import React, { useEffect, useState } from "react"
import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import UserDetailModal from "./UserDetailModal"
import { useUserTable } from "@/hooks/useUserTable"
import NoData from "./NoData"
import { getUsers, GetUsersParams } from "@/services/admin/user"

type Props = {
  pageSize: number
  searchParams: GetUsersParams
}

const UserTable = ({ pageSize, searchParams }: Props) => {
  const [data, setData] = useState<SearchUserData[]>([])

  useEffect(() => {
    (async() => {
      const users = await getUsers(searchParams)
      setData(users)
    })()
  }, [searchParams])

  const {
    modalVisible,
    selectedUser,
    handleExcelDownload,
    handleRowClick,
    setModalVisible,
  } = useUserTable(data, pageSize)

  const UserCard = ({ user }: { user: SearchUserData }) => {
    return (
      <div 
        className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50"
        onClick={() => handleRowClick(user)}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <span className="font-semibold">이름:</span>
            <span className="ml-2">{user.name}</span>
          </div>

          <div>
            <span className="font-semibold">권한:</span>
            <span className={`ml-2 px-2 py-1 rounded ${
              user.permission === "user" ? "bg-green-500" : "bg-red-500"
            } text-white`}>
              {user.permission}
            </span>
          </div>

          <div>
            <span className="font-semibold">최근로그인:</span>
            <span className="ml-2">
              {user.loginAt ? user.loginAt.substring(0, 16) : "-"}
            </span>
          </div>

          <div>
            <span className="font-semibold">아이디:</span>
            <span className="ml-2">{user.userId}</span>
          </div>

          <div className="sm:block">
            <span className="font-semibold">가입일:</span>
            <span className="ml-2">{user.createAt.substring(0, 10)}</span>
          </div>

          <div className="md:block">
            <span className="font-semibold">이메일:</span>
            <span className="ml-2">{user.email}</span>
          </div>

          <div className="lg:block">
            <span className="font-semibold">휴대폰:</span>
            <span className="ml-2">{user.phoneNum}</span>
          </div>

          <div className="lg:block">
            <span className="font-semibold">회원상태:</span>
            <span className="ml-2">{user.userStatus}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className='flex justify-between items-center'>
        <span>총 {data?.length ?? 0}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map(user => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      ) : (
        <NoData message='검색 결과가 없습니다.' />
      )}

      <UserDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        user={selectedUser}
      />
    </div>
  )
}

export default UserTable