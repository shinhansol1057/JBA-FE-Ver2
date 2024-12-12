// components/user-table.tsx
"use client"

import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { User } from "../type"
import NoData from "./no-data"
import UserCard from "./user-card"

interface Props {
  initialData: User[]
}

const UserTable = ({ initialData }: Props) => {
  const handleExcelDownload = async () => {
    try {
      const data = initialData.map((user) => ({
        이름: user.name,
        권한: user.permission,
        최근로그인: user.loginAt ? user.loginAt.substring(0, 16) : "-",
        아이디: user.userId,
        가입일: user.createAt.substring(0, 10),
        이메일: user.email,
        휴대폰: user.phoneNum,
        회원상태: user.userStatus
      }))

      const headers = Object.keys(data[0]).join(",")
      const rows = data.map((row) => Object.values(row).join(","))
      const csvContent = [headers, ...rows].join("\n")

      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `회원목록_${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Excel 다운로드 중 오류 발생:", error)
    }
  }

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <span>총 {initialData.length}건</span>
        <Button icon={<DownloadOutlined />} onClick={handleExcelDownload}>
          엑셀 다운로드
        </Button>
      </div>

      {initialData.length > 0 ? (
        <div className="space-y-4">
          {initialData.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
        </div>
      ) : (
        <NoData message="검색 결과가 없습니다." />
      )}
    </div>
  )
}

export default UserTable
